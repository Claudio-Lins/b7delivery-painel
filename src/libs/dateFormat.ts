export const dateFormat = (data: string | Date) => {
  return new Intl.DateTimeFormat('pt-PT', {
    dateStyle: 'short', timeStyle: 'short'
  }).format(
    typeof data === 'string' ? new Date(data) : data
  )
}