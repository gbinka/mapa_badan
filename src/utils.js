export function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    const fjs = document.getElementsByTagName('script')[0]
    if (document.getElementById(id)) return Promise.reject(true)
    const js = document.createElement('script')
    js.id = id
    js.onerror = reject
    js.onload = resolve
    js.src = src
    fjs.parentNode.insertBefore(js, fjs)
  })
}

export function getGoogleMapsApi() {
  return Promise.resolve(
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=' +
        'AIzaSyBv6RqWimofK-k6xeoddqpvYvCFMnN27Fg',
      'google-mapsapi'
    )
  )
}
