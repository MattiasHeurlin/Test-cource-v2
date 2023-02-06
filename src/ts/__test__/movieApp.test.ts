/**
 * @jest-environment jsdom
 */
import { IMovie } from '../models/Movie';
import * as movieApp from '../movieApp';
import { movieTestList } from '../services/__mocks__/movieservice';


beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
});

jest.mock('../services/movieservice.ts');

test('Init - Create Eventlistiners and call correct function', () => {
    document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>
    `;
    let spy = jest.spyOn(movieApp, 'handleSubmit').mockResolvedValue();

    movieApp.init();
    const form = document.querySelector('#searchForm') as HTMLFormElement;
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();   
});

describe('HandleSubmit function tests', () => {
    test('3 movies gets returned, call correct function', async () => {
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" value="error"/>
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;
        let spyCreateHtml = jest.spyOn(movieApp, 'createHtml').mockReturnValue();
        let spyDisplayNoResult = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

        await movieApp.handleSubmit();
        
        expect(spyCreateHtml).toBeCalledTimes(1);
        expect(spyDisplayNoResult).toBeCalledTimes(0);
        spyCreateHtml.mockRestore();
        spyDisplayNoResult.mockRestore();
    })
    test('empty array gets returned, call displayNoResult', async () => {
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" value="empty array please">
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;
        let spyCreateHtml = jest.spyOn(movieApp, 'createHtml').mockReturnValue();
        let spyDisplayNoResult = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

        await movieApp.handleSubmit();
        
        expect(spyCreateHtml).toBeCalledTimes(0);
        expect(spyDisplayNoResult).toBeCalledTimes(1);
        spyCreateHtml.mockRestore();
        spyDisplayNoResult.mockRestore();
    })
    test('Api throws error - call displayNoResult', async () => {
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" value="test">
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;
        let spyCreateHtml = jest.spyOn(movieApp, 'createHtml').mockReturnValue();
        let spyDisplayNoResult = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

        await movieApp.handleSubmit();
        
        expect(spyCreateHtml).toBeCalledTimes(0);
        expect(spyDisplayNoResult).toBeCalledTimes(1);
        spyCreateHtml.mockRestore();
        spyDisplayNoResult.mockRestore();
    })
})


test('should create html correctly', () => {
    document.body.innerHTML = `
    <div id="movie-container"></div>
    `
    let container = document.getElementById('movie-container') as HTMLDivElement;
    let movies = movieTestList
    
    movieApp.createHtml(movies, container);
    let divCount = document.querySelectorAll('.movie');
    let divTitle = document.querySelectorAll('.movie > h3');
    let divImg: HTMLImageElement = document.querySelector('div:nth-child(1) > img') as HTMLImageElement;
   
    expect(container.innerHTML).toContain('div');
    expect(divCount.length).toBe(3)
    expect(divTitle[0].innerHTML).toBe(movies[0].Title);
    expect(divImg?.src).toBe(movies[0].Poster + '/');
});

test('displayNoResult - create p element with string', () => {
    document.body.innerHTML = `
    <div id="container"></div>
    `
    const container: HTMLDivElement = document.querySelector('#container') as HTMLDivElement;

    movieApp.displayNoResult(container);

    let noResultEl = document.querySelector('p');
    expect(noResultEl).toBeDefined;
    expect(noResultEl?.innerHTML).toBe('Inga sökresultat att visa');
})