import * as functions from '../functions';
import { IMovie } from '../models/Movie';
import { movieTestList } from '../services/__mocks__/movieservice';

test('Sortmovies correctly - desc true', () => {
    let testList: IMovie[] = movieTestList;

    functions.movieSort(testList, true);

    expect(testList[0].Title).toBe('The Dark Knight');
    expect(testList[1].Title).toBe('The Godfather');
    expect(testList[2].Title).toBe('The Shawshank Redemption');
})

test('Sortmovies correctly - desc false', () => {
    let testList: IMovie[] = movieTestList;

    functions.movieSort(testList, false);

    expect(testList[2].Title).toBe('The Dark Knight');
    expect(testList[1].Title).toBe('The Godfather');
    expect(testList[0].Title).toBe('The Shawshank Redemption');
})