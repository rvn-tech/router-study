import axios from 'axios'
import qs from 'qs'
import { env } from '../env/dev'

const APP_ID = env.APP_ID

function useHiraganaka() {

	const hiraganaka = (sentence) => {
		return axios({
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: qs.stringify({
				app_id: APP_ID,
				sentence: sentence,
				output_type: 'hiragana'
			}),
			url: 'https://labs.goo.ne.jp/api/hiragana'
		})
	}
	
	return hiraganaka
}

export default useHiraganaka
