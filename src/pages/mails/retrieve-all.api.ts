import axios from '@/axios'

export function useGetMailApi() {
  const send = async (id: string) => {
    try {
      const response = await axios.get('/v1/mails/' + id)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
