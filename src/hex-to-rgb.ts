
export function hexToRgba(hex, alpha= 0.9) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgba = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: alpha
    } : {
        r: 22,
        g: 22,
        b: 22,
        a: alpha
    };

    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}
