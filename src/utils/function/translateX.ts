function translateX(transform: string) {
    if (transform && transform.includes('translate3d')) {
        const strTranslateX = transform
        .replace('translate3d', '')
        .replace('(', '')
        .replace(')', '')
        .split(', ')[0]
        .replace('px', '');
        return Number(strTranslateX);
    } else {
        return 0;
    }
}

export { translateX };