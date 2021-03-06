module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget('./src/sass/');

    eleventyConfig.addPassthroughCopy('src/assets/');

    if (process.env.ELEVENTY_ENV === 'prod') {
        eleventyConfig.ignores.add('./src/__docs/');
    }

    eleventyConfig.addShortcode(
        'card',
        function ({
            cardImage,
            cardAlt,
            cardTitle,
            cardType,
            featureLink,
            featureLinkContent,
        }) {
            let cardClasses =
                cardType === 'feature' ? 'card--feature-image' : '';
            let cardContent = '';
            if (cardType === 'feature') {
                cardContent = `<a href="${featureLink}">${featureLinkContent}</a>`;
            }
            return `
                <div class="card ${cardClasses}">
                    <img src="${cardImage}" alt="${cardAlt}">
                    <div class="card__content">
                        <h3 class="card__title">${cardTitle}</h3>
                        ${cardContent}
                    </div>
                </div>
            `;
        }
    );

    return {
        dir: {
            input: 'src',
            output: 'public',
        },
    };
};
