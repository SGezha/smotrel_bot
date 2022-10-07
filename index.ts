import { Telegraf, Markup } from "telegraf"
import { InlineQueryResult } from "telegraf/types"
import fetch from 'node-fetch'
import * as dotenv from 'dotenv'

dotenv.config()

const bot = new Telegraf(process.env.TOKEN)

bot.hears('hi', (ctx) => ctx.reply('Hey there'))

interface anime {
	id: string,
	title: string;
	desc: string;
	watched: boolean;
	nowepisode: number;
	maxepisodes: number;
	stars: number;
	date: string;
	poster: any;
	url: string;
}

bot.on("inline_query", async ctx => {
	let query: string = ctx.inlineQuery.query
	try {
		const response = await fetch('https://olsioradmin.smotrel.net/api/animes?populate=poster&pagination=[pageSize]=50')
		const body = await response.text()
		const { data } = JSON.parse(body)
		let animes = data.map(function (anime: any) {
			return {
				id: anime.id,
				title: anime.attributes.title,
				desc: anime.attributes.description,
				watched: anime.attributes.watched,
				nowepisode: anime.attributes.nowepisode,
				maxepisodes: anime.attributes.maxepisodes,
				stars: anime.attributes.stars,
				date: anime.attributes.date,
				poster: anime.attributes.poster,
				url: anime.attributes.url
			}
		})
		let result: InlineQueryResult[] = animes
			.filter((anime: anime) => anime.title.includes(query))
			.map(
				({ id, title, desc, watched, nowepisode, maxepisodes, stars, date, poster, url }: anime): InlineQueryResult => ({
					type: "article",
					id,
					title,
					description: desc,
					thumb_url: `https://olsioradmin.smotrel.net${poster.data.attributes.url}`,
					input_message_content: {
						parse_mode: "HTML",
						message_text: `<a href="https://smotrel.net/watch/${url}">${title}</a>
<b>Дата перегляду:</b> ${new Date(date).toLocaleDateString()}
<b>Оцінка:</b> ${stars} ⭐
<b>Серія:</b> ${nowepisode}/${maxepisodes}
`,
					},
					...Markup.inlineKeyboard([Markup.button.url("📺 Дивитися онлайн", `https://smotrel.net/watch/${url}`)]),
				}),
			)
		return await ctx.answerInlineQuery(result)
		console.log(animes)
	} catch (er) {
		console.log(er)
	}
})

bot.on("chosen_inline_result", ({ chosenInlineResult }) => {
	// console.log("Выбран вариант", chosenInlineResult)
})

bot.launch()
.then(res => {
	console.log('Бот работает')
})