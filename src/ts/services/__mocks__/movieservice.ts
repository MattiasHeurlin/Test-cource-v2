import { IMovie } from "../../models/Movie";

export const movieTestList: IMovie[] = [
    {
        Title: 'The Shawshank Redemption',
        imdbID: 'tt0111161',
        Type: 'movie',
        Poster: 'https://test1.jpg',
        Year: '1994'
    },
    {
        Title: 'The Godfather',
        imdbID: 'tt0068646',
        Type: 'movie',
        Poster: 'https://test2.jpg',
        Year: '1972'
    },
    {
        Title: 'The Dark Knight',
        imdbID: 'tt0468569',
        Type: 'movie',
        Poster: 'https://test3.jpg',
        Year: '2008'
    }
];


export async function getData(searchText: string): Promise<IMovie[]> {
    return new Promise((resolve, reject) => {
        if(searchText.includes('test')) {
            reject();
        } else if(searchText.includes('empty array please')) {
            resolve([]);
        } else {
            resolve(movieTestList);
        }
    })
}