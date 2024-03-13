import '../css/Home.css';

import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SearchResults from '../components/SearchResults';

// mock de resultados de busca para teste
// const SEARCH_RESULTS = {
// 	results: [{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/400x400/333/888',
// 		author: 'NomeDoPortal',
// 	},
// 	{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/500x400/333/888',
// 		author: 'NomeDoPortal',
// 	},
// 	{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/400x500/333/888',
// 		author: 'NomeDoPortal',
// 	},
// 	{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/600x400/333/888',
// 		author: 'NomeDoPortal',
// 	},
// 	{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/400x600/333/888',
// 		author: 'NomeDoPortal',
// 	},
// 	{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/800x500/333/888',
// 		author: 'NomeDoPortal',
// 	},
// 	{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/500x800/333/888',
// 		author: 'NomeDoPortal',
// 	},
// 	{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/765x334/333/888',
// 		author: 'NomeDoPortal',
// 	},
// 	{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/445x982/333/888',
// 		author: 'NomeDoPortal',
// 	},
// 	{
// 		title: 'Título',
// 		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat...',
// 		image: 'https://placehold.co/1000x2345/333/888',
// 		author: 'NomeDoPortal',
// 	}]
// };

const SEARCH_API_URL = 'https://gnews.io/api/v4/search';
const SEARCH_API_KEY = '9327490b8ff243c91b713513fc0e6c2b';

const Home = () => {
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState();
	const [searchQuery, setSearchQuery] = useState(null);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value.trimStart().substring(0, 20));
	}

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setSearchQuery(null);
		const abortController = new AbortController();
		fetch(`${SEARCH_API_URL}?q=${searchText}&max=10&apikey=${SEARCH_API_KEY}`, { signal: abortController.signal })
			.then(res => res.json())
			.then(data => {
				setSearchResults(data.articles);
				setSearchQuery(searchText);
				console.log(data);
			}).catch(() => {
				abortController.abort();
			});
	}

	return (
		<div className="home">
			{/* banner */}
			<header>
				<Navbar loggedIn={false} />
				<div className="textContainer">
					<h2>Encontre notícias<br />de maneira fácil</h2>
					<p>Digite o que deseja no campo de buscas e<br />confira os resultados</p>
				</div>
			</header>

			{/* barra de pesquisa */}
			<form onSubmit={handleSearchSubmit}>
				{/* desativa busca se a busca estiver vazia */}
				<button disabled={!searchText}></button>
				<input
					type="text"
					placeholder="Buscar..."
					value={searchText}
					onChange={handleSearchChange}
					autoFocus
				/>
			</form>

			{/* resultados da busca */}
			{searchQuery && <SearchResults query={searchQuery} results={searchResults} />}
			{/* rodapé */}
			<Footer />
		</div>
	);
}

export default Home;