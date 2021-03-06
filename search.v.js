/**
 * Script searches through LS games JSON. Read README for details.
 * @author Lana Zakrevska <lana.zakrevska@gmail.com>
 * @version 1.0.2
 */

(function($){

    var searchInput = $('#search'),
        gamesListBlock = $('.items-line');

    var Search = {

        init: function(inputValue) {
            var value = inputValue.toLowerCase(),
                characters = value.length;

            if (characters > 2) {
                this.getGames(value);
            } else if (!characters) {
                this.parseGamesFromLS();
            }
        },

        parseGamesFromLS: function() {
            var games = localStorage.getItem('games');
                games = $.parseJSON(games);

            gamesListBlock.empty();

            $.map(games, function (game) {
                var image = game.image['0'],
                    link = game.link['0'];

                Search.appendGames(image, link);
            });

        },

        getGames: function(value) {
            var games = localStorage.getItem('games');

            if (games) {
                this.getResults(games, value);
            }
        },

        getResults: function(data, value) {
            data = $.parseJSON(data);

            var searchResults = $.map(data, function (elem) {
                var link = elem.link['0'].title;
                link = link.toLowerCase();

                var match = link.indexOf(value) !== -1;
                return match ? elem : null;
            });

            if (!$.isEmptyObject(searchResults)) {
                this.prepareGames(searchResults);
            } else {
                gamesListBlock.empty();
                gamesListBlock.append('<p>По вашему запросу ничего не найдено. ' +
                    'Попробуйте ввести похожие по смыслу слова, чтобы получить лучший результат.</p>');
            }
        },

        prepareGames: function(results) {
            gamesListBlock.empty();

            $.map(results, function (elem) {
                var image = elem.image['0'],
                    link = elem.link['0'];

                Search.appendGames(image, link);
            });
        },

        appendGames: function(image, link) {
            var redirectTo = localStorage.getItem('redirect');

            gamesListBlock.append('<div class="items-line__el"><div class="item">'
                + '<a href="' + link.href + '" class="item__img">'
                    + '<img src="' + image.src + '" class="wp-post-image" alt="' + image.alt + '" width="364" height="265">'
                + '</a>'
                + '<div class="item__in">'
                    + '<div class="item__name-game">' + link.title + '</div>'
                    + '<div class="item__pnl">'
                        + '<a href="' + link.href + '" class="item__btn--demo">Демо</a>'
                        + '<!--noindex--><a href="' + redirectTo + '" class="item__btn--play" rel="nofollow">ИГРАТЬ</a><!--/noindex-->'
                    + '</div>'
                + '</div>'
            + '</div></div>');
        }

    };

    searchInput.on('input', function() { Search.init(this.value) });

    searchInput.on('keypress', function(e) {
        if (e.keyCode === 13) { return false; }
    });

})(jQuery);
