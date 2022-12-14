"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var telegraf_1 = require("telegraf");
var node_fetch_1 = require("node-fetch");
var dotenv = require("dotenv");
dotenv.config();
var bot = new telegraf_1.Telegraf(process.env.TOKEN);
bot.hears('hi', function (ctx) { return ctx.reply('Hey there'); });
bot.on("inline_query", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var query, response, body, data, animes, result, er_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = ctx.inlineQuery.query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, (0, node_fetch_1["default"])('https://olsioradmin.smotrel.net/api/animes?populate=poster&pagination[pageSize]=50')];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 3:
                body = _a.sent();
                data = JSON.parse(body).data;
                animes = data.map(function (anime) {
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
                        url: anime.attributes.url,
                        tg: anime.attributes.episodes[0].tgLink
                    };
                });
                result = animes
                    .filter(function (anime) { return anime.title.toLowerCase().includes(query.toLowerCase()); })
                    .map(function (_a) {
                    var id = _a.id, title = _a.title, desc = _a.desc, watched = _a.watched, nowepisode = _a.nowepisode, maxepisodes = _a.maxepisodes, stars = _a.stars, date = _a.date, poster = _a.poster, url = _a.url, tg = _a.tg;
                    return (__assign({ type: "article", id: id, title: title, description: desc, thumb_url: "https://olsioradmin.smotrel.net".concat(poster.data.attributes.url), input_message_content: {
                            parse_mode: "HTML",
                            message_text: "<a href=\"https://smotrel.net/watch/".concat(url, "\">").concat(title, "</a>\n<b>\u0414\u0430\u0442\u0430 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443:</b> ").concat(new Date(date).toLocaleDateString(), "\n<b>\u041E\u0446\u0456\u043D\u043A\u0430:</b> ").concat(stars, " \u2B50\n<b>\u0421\u0435\u0440\u0456\u044F:</b> ").concat(nowepisode, "/").concat(maxepisodes, "\n")
                        } }, telegraf_1.Markup.inlineKeyboard([telegraf_1.Markup.button.url("???? ???????????????? ????????????", "https://smotrel.net/watch/".concat(url)), telegraf_1.Markup.button.url("??? Telegram", "".concat(tg))])));
                });
                return [4 /*yield*/, ctx.answerInlineQuery(result)];
            case 4: return [2 /*return*/, _a.sent()];
            case 5:
                er_1 = _a.sent();
                console.log(er_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
bot.on("chosen_inline_result", function (_a) {
    var chosenInlineResult = _a.chosenInlineResult;
    // console.log("???????????? ??????????????", chosenInlineResult)
});
bot.launch()
    .then(function (res) {
    console.log('?????? ????????????????');
});
