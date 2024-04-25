export function generateImageUrl(pokemonId) {
  const baseUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  return `${baseUrl}${pokemonId}.png`;
}

export function getRelatedPokemonImages(pokemonId, position, evolutionChain) {
  const imageUrls = {};

  if (position === 'first_evolution') {
    imageUrls.base_evolution = [
      generateImageUrl(pokemonId - 1),
      evolutionChain.base_evolution,
    ];
    imageUrls.first_evolution = [
      generateImageUrl(pokemonId),
      evolutionChain.first_evolution,
    ];
    if (evolutionChain.second_evolution) {
      imageUrls.second_evolution = [
        generateImageUrl(pokemonId + 1),
        evolutionChain.second_evolution,
      ];
    }
  } else if (position === 'second_evolution') {
    imageUrls.base_evolution = [
      generateImageUrl(pokemonId - 2),
      evolutionChain.base_evolution,
    ];
    imageUrls.first_evolution = [
      generateImageUrl(pokemonId - 1),
      evolutionChain.first_evolution,
    ];
    imageUrls.second_evolution = [
      generateImageUrl(pokemonId),
      evolutionChain.second_evolution,
    ];
  } else if (position === 'base_evolution') {
    imageUrls.base_evolution = [
      generateImageUrl(pokemonId),
      evolutionChain.base_evolution,
    ];
    if (evolutionChain.first_evolution) {
      imageUrls.first_evolution = [
        generateImageUrl(pokemonId + 1),
        evolutionChain.first_evolution,
      ];
    }
    if (evolutionChain.second_evolution) {
      imageUrls.second_evolution = [
        generateImageUrl(pokemonId + 2),
        evolutionChain.second_evolution,
      ];
    }
  }

  return imageUrls;
}

export function findEvolutionPosition(pokemonName, evolutionChain) {
  for (const [position, name] of Object.entries(evolutionChain)) {
    if (name === pokemonName) {
      return position;
    }
  }
  return 'unknown';
}
