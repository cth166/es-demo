async function fetchApi(url) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' }
  })
  if (response.ok) return response.json()
}

export {
  fetchApi
}
