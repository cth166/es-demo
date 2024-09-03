import { fetchApi } from "./fetch.js";

const titleEl = document.querySelector('#title')

void async function () {
  const { msg } = await fetchApi('/api')
  titleEl.textContent = msg
}()


