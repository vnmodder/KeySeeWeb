import { AxiosResponse } from 'axios'

/**
 * Function to create file then download them from FileContentResult from back-end side.
 * @param response Response from back-end which API called from axios.
 * @param defaultFileName Default file name if there are no suggest file name from response.
 */
export const downloadFileFromResponse = (
  response: AxiosResponse<any, any>,
  defaultFileName: string
) => {
  const fileBlob = new Blob([response.data])

  // Create a URL for the Blob
  const fileUrl = URL.createObjectURL(fileBlob)

  // Get the filename from the Content-Disposition header
  const contentDispositionHeader = response.headers['content-disposition']
  const fileNameMatch = /filename\*=UTF-8''(.+)/.exec(contentDispositionHeader)
  let fileName = fileNameMatch ? decodeURIComponent(fileNameMatch[1]) : defaultFileName

  // Create a link element and click it to trigger the file download
  const downloadElement = document.createElement('a')
  downloadElement.href = fileUrl
  downloadElement.download = fileName
  downloadElement.click()

  // Clean up the URL object
  URL.revokeObjectURL(fileUrl)
}
