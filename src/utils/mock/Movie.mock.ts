import { aTvSeries } from './FeaturedTvSeries.mock';
import { cloneDeep } from '../function/cloneDeep';

const tvSeriesList = [
    cloneDeep(aTvSeries),
    cloneDeep(aTvSeries),
    cloneDeep(aTvSeries),
    cloneDeep(aTvSeries),
    cloneDeep(aTvSeries),
    cloneDeep(aTvSeries),
    cloneDeep(aTvSeries),
    cloneDeep(aTvSeries),
    cloneDeep(aTvSeries),
    cloneDeep(aTvSeries),
];
tvSeriesList.forEach((tvSeries, index) => tvSeries.id = index);

const media = {
    items: {
        response: {
            page: 1,
            total_pages: 7685,
            total_results: 153689,
            results: tvSeriesList
        }, 
        request: {
            bodyUsed: true,
            headers: new Headers(),
            ok: true,
            redirected: false,
            status: 200,
            statusText: "",
            type: "cors",
            url: "https://api.themoviedb.org/3/tv/popular?api_key=f91aada4d1ee567f301885f614e26e94&language=en-US",
        },
    },
    slug: "tv series",
    title: "TV Series",
    type: "tv",
}

export { media };