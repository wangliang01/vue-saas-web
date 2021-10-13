const express = require('express')
const router = express.Router()
router.prefix = '/oauth'

router.use(function timeLog(req, res, next) {
  console.log('请求开始: ', req.url)
  next()
})

router.post('/token', async(req, res) => {
  console.log('请求地址', req.url)
  res.json({
    code: '200',
    data: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiZ29vZHMtc2VydmljZSIsInN1cHBsaWVyLXNlcnZpY2UiLCJ1YWEtc2VydmVyIiwic2FsZXMtc2VydmljZSIsInBheW1lbnQtc2VydmljZSIsInN5c3RlbS1zZXJ2aWNlIiwid2FyZWhvdXNlLXNlcnZpY2UiLCJmaW5hbmNpYWwtc2VydmljZSIsInNjbS1zZXJ2aWNlIiwiZmlsZS1zZXJ2aWNlIiwicHJvY3VyZW1lbnQtc2VydmljZSJdLCJ1c2VyX25hbWUiOiIxODU2NjcyNTIwMyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2NzUxNTU5NDQsInVzZXIiOnsicGFzc3dvcmQiOm51bGwsInVzZXJuYW1lIjoiMTg1NjY3MjUyMDMiLCJhdXRob3JpdGllcyI6W10sImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsImFjY291bnRUeXBlIjoiU1RBRkYiLCJhY2NvdW50SWQiOjMyLCJwaG9uZSI6IjE4NTY2NzI1MjAzIiwibmFtZSI6IjE4NTY2NzI1MjAzIn0sImp0aSI6IjM4Y2RlZWZkLTE1OTMtNDI2Ni04ZjY1LTdmYTQwOTlhOThiZSIsImNsaWVudF9pZCI6InN5c3RlbS1zZXJ2aWNlIn0.kTjvz6JxeIfRTYhKZMFuMmbPKV2cZe1SbEcWdEjHH4uTEcmM0xhEbVYj-AmTWCGsveNXx9RoKknVdfbuc9zLwoI7AynXgjr5OIDUCkUOVypnSOhUGKv_KFjwIjtomuVnGg5oXsD4NPH3RLuF4mvDTukYUAnzIo8HIz_tWXgGGUWFz6NteMX8j8tiPiYd-3mxOeZqbc5xEx2uKW4-ANiKIiA8m3HbyWS6Ekf_4iBGtNIV-iT7geQIm_UYx9n3O9bVbi473HtG-5mL74_IzIpiw8E-n2_4VSP0mFDktOFCW899Dxtyr2cgvXeZ48ifmVFhlY6sPRjSjeluIESi9qvy8Q',
    msg: '',
    success: true
  })
})

module.exports = router
