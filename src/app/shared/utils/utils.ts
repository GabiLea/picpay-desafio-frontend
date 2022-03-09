export const getHoursDate = (data: string) => {
  const d = new Date()
  return `${data}T${d.toISOString().split('T')[1]}`
}

export const getPagination = (rows, limit, maxPage, page) => {
  const pages = []
  const total = Math.ceil(rows / limit)
  const viewLeftRight = Math.floor(maxPage / 2)
  const negative = page - viewLeftRight < 1 ? (page - viewLeftRight) - 1 : 0
  let startView = (page - viewLeftRight >= 1) ? page - viewLeftRight : 1
  const sumEnd = page + viewLeftRight + (negative * -1)
  const endView = (sumEnd <= total) ? sumEnd : total
  for (let i = startView; i <= endView; i++)
    pages.push(i)
  return pages
}

export const convertObjectInArray = (obj) => {
    return Object.keys(obj).map(function (chave) {
      return obj[chave];
    })
}