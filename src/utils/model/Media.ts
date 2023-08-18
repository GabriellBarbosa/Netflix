import { Movie } from "./Movie";
import { TvSeries } from "./TvSeries";

export interface Media {
    slug: string;
    title: string;
    type: string;
    items: {
        request: Request;
        response: Response;
    };
}

interface Request {
    bodyUsed: boolean;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
}

interface Response {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<TvSeries | Movie>;
}




