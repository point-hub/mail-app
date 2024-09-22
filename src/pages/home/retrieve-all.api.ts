import axios from '@/axios'

interface ISearch {
  all: string
  created_date: string
  to: string
  subject: string
}

export function useGetMailsApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/mails', {
        params: {
          filter: {},
          page: page
        }
      })

      return {
        data: response.data.data,
        pagination: response.data.pagination
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
