import "./ColorCustomizer.css"

const COLOR_MAP = {
    yellow: '#ffd500',
    green: '#008000',
    blue: '#0000ff',
    pink: '#ffc0cb',
    purple: '#800080',
    orange: '#ffa500',
    red: '#ff0000',
    brown: '#a52a2a',
    black: '#000000'
}

const ColorCustomizer = (props) => {
    return (
        <div className='color-customizer'>
            {Object.keys(COLOR_MAP).map(color => (
                <div key={color}
                    className='color-customizer-color'
                    style={{ backgroundColor: COLOR_MAP[color] }}
                    onClick={() => props.onColorChange(COLOR_MAP[color])}
                />
            ))}
        </div>
    )
}

export default ColorCustomizer