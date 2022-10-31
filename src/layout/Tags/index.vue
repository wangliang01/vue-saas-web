<template>
  <div class="tags-flex">
    <div ref="tags-container" class="tags-container" :class="{'nav-scroll':!isHide}">
      <y-tag v-if="!isHide" class="y-m-r-8 tag-cur-point tag-prev" @click="onLeft"><i class="el-icon-arrow-left"></i></y-tag>
      <y-tag v-if="!isHide" class="y-m-r-8 tag-cur-point tag-next" @click="onRight"><i class="el-icon-arrow-right"></i></y-tag>
      <div ref="tags" class="tags">
        <div ref="tags-nav" class="tags-nav" :style="setTranslateX">
          <y-tag v-for="(tag, index) in tags" :key="tag.path" closable class="y-m-r-8 tag" :type="getType(tag)" @close="handleClose(tag, index)" @click="handleClick(tag)">
            {{ tag.meta && tag.meta.title }}
            <i v-if="getType(tag) === 'primary'" class="el-icon-refresh" style="marginLeft:5px" @click="$emit('refresh')"></i>
          </y-tag>
        </div>
      </div>
    </div>
    <el-dropdown v-if="!isHide" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <y-tag class="tag-cur-point tag-down"><i class="el-icon-arrow-down"></i></y-tag>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-back" command="left">关闭左侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-right" command="right">关闭右侧</el-dropdown-item>
        <el-dropdown-item icon="el-icon-close" command="other">关闭其他</el-dropdown-item>
        <!--        <el-dropdown-item icon="el-icon-error">全部关闭</el-dropdown-item>-->
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import getTag from '@/utils/getTag'
import config from '@/config'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Tags',
  data() {
    return {
      isHide: true,
      translateX: 1,
      setTranslateX: '',
      currentTranslateX: ''
    }
  },
  computed: {
    ...mapState(['tags'])
  },
  watch: {
    '$route': {
      handler(val, old) {
        const routes = config.menu
        const curTag = getTag(routes, val)
        if (!curTag) return
        const curRoute = this.$route
        curTag.name = curRoute.name
        curTag.query = curRoute.query
        if (curTag?.children && curTag.children.length) return
        // 添加到store中
        this.$store.commit('ADD_TAG', { tag: curTag, old })
        this.$nextTick(() => {
          this._init()
        })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // this.init()
    this._init = _.debounce(this.init, 400)
    window.addEventListener('resize', this._init)
  },
  destroyed() {
    const tags = this.$refs['tags-container']
    tags && tags.removeEventListener('mousewheel', this.rollFn)
    window.removeEventListener('resize', this._init)
  },
  methods: {
    getType(tag) {
      const routes = config.menu
      const curTag = getTag(routes, this.$route)
      if (curTag && curTag.path === tag.path) {
        return 'primary'
      }
      return 'info'
    },
    handleClose(tag, tagIndex) {
      if (tagIndex === 0 && this.tags.length === 1) {
        this.$message.warning('此标签不可移除了...')
        return
      }
      // 移除选中的tag
      this.$store.commit('REMOVE_TAG', tag)
      if (this.getType(tag) === 'primary') {
        const nextTag = this.tags.slice(tagIndex)[0]
        const prevTag = this.tags.slice(tagIndex - 1)[0]
        if (prevTag) {
          this.$router.push({ path: prevTag.path, query: prevTag.query })
        } else if (nextTag) {
          this.$router.push({ path: nextTag.path, query: nextTag.query })
        } else {
          this.$router.push('/')
        }
      }
      this.$nextTick(() => this._init())
    },
    handleClick(tag) {
      if (tag.path === this.$route.path) return
      this.$router.push({ path: tag.path, query: tag.query })
    },
    init() {
      const tags = this.$refs['tags-container']
      const tagsNav = this.$refs['tags-nav']
      if (!tags || !tagsNav) return
      const tagsWidth = tags?.clientWidth || 0// 容器
      const tagsNavWidth = tagsNav?.clientWidth || 0 // 滚动容器
      this.translateX = tagsWidth - tagsNavWidth
      this.isHide = this.translateX > 0
      if (!this.isHide) {
        // this.translateX -= 116
        this.$nextTick(() => {
          this.setOffset(tagsWidth)
        })
      } else {
        this.onLeft()
      }
      tags.removeEventListener('mousewheel', this.rollFn)
      tags.addEventListener('mousewheel', this.rollFn)
    },
    setOffset(tagsWidth) {
      const activeTag = document.querySelector('.tags-nav .el-tag--primary')
      const navMenu = document.querySelector('.nav-menu-vertical')
      const navMenuWidth = navMenu?.getBoundingClientRect().width || 209
      const box = activeTag?.getBoundingClientRect()
      if (!box) return
      const x = box.x
      // const translateX = x - tagsWidth + 8
      // 1567 -  1103 - 209 + 124 + 48
      // 48 左右移动icon宽度 209为菜单宽度 16为tag盒子外边距
      const otherWidth = navMenuWidth + 48 + 16
      let translateX = x - tagsWidth + box.width + 48 - navMenuWidth
      const xBean = x + Math.abs(this.currentTranslateX)
      if (xBean > otherWidth) {
        // if (xBean < tagsWidth - otherWidth) return
        if (this.currentTranslateX) {
          translateX -= this.currentTranslateX
        }
        this.onPosition(-translateX)
      } else {
        const width = this.currentTranslateX + otherWidth - x + 10
        this.onPosition(width)
      }
    },
    /**
     * 鼠标滚动事件
     * @param e
     */
    rollFn(e) {
      if (e.wheelDelta) { // IE/Opera/Chrome
        if (e.wheelDelta > 0) {
          this.onLeft()
          return
        }
        this.onRight()
      }
    },
    onLeft() {
      this.currentTranslateX = 0
      this.setTranslateX = `transform: translateX(0px);`
    },
    onRight() {
      // this.translateX -= 116
      this.currentTranslateX = this.translateX
      this.setTranslateX = `transform: translateX(${this.translateX - 116}px);`
    },
    onPosition(x) {
      if (x > 0) x = 0
      this.currentTranslateX = x
      this.setTranslateX = `transform: translateX(${x}px);`
    },
    handleCommand(target) {
      const { path } = this.$route
      const index = this.tags.findIndex(item => item.path === path)
      if (index === -1) {
        this.$message.warning('请选择一个导航标签')
        return
      }
      let tags
      if (target === 'left') {
        tags = this.tags.slice(index)
      } else if (target === 'right') {
        tags = this.tags.slice(0, index + 1)
      } else {
        tags = this.tags.slice(index, index + 1)
      }
      this.$store.commit('SET_TAG', tags)
      this.onLeft()
      setTimeout(() => {
        this._init()
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>

.tags-container {
  height: 37px;
  flex: 1;
  position: relative;
  overflow: hidden;
  &.nav-scroll{
    padding: 0 58px;
  }
}
.tags{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  .tag{
    cursor: pointer;
    background-color: #fff;
    border: none;
    &.is-hide {
      display: none;
    }
  }
}
.tag-cur-point {
  cursor: pointer;
}

.tags-flex {
  display: flex;
  margin: 8px 16px;
  user-select: none;
}

.tags-nav {
  padding-left: 0;
  margin: 0;
  float: left;
  list-style: none;
  box-sizing: border-box;
  position: relative;
  transition: transform .5s ease-in-out;
}

.tag-prev, .tag-next {
  position: absolute;
  line-height: 32px;
  cursor: pointer;
}

.tag-prev {
  left: 0;
}

.tag-next {
  right: 0;
}
</style>
