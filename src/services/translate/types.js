export default class TypeTranslate {
    static types = {
        'normal': 'normal',
        'fire': 'fogo',
        'water': 'água',
        'grass': 'grama',
        'electric': 'elétrico',
        'ice': 'gelo',
        'fighting': 'lutador',
        'poison': 'venenoso',
        'ground': 'terra',
        'flying': 'voador',
        'psychic': 'psíquico',
        'bug': 'inseto',
        'rock': 'pedra',
        'ghost': 'fantasma',
        'dark': 'escuro',
        'dragon': 'dragão',
        'steel': 'aço',
        'fairy': 'fada'
    }

    static translate(type) {
        return this.types[type]
    }
}