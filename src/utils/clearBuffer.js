import $store from '@/store'

export default async function(tagName) {
  return new Promise(resolve => {
    $store.commit('REMOVE_TAG', {
      name: tagName
    })
    setTimeout(() => {
      resolve()
    })
  })
}
