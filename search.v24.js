/**
 * Script searches through LS games JSON. Read README for details.
 * @author Lana Zakrevska <lana.zakrevska@gmail.com>
 * @version 1.0.2
 */

(function($){

    var searchInput = $('#search'),
        gamesListBlock = $('.game-list');

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
            gamesListBlock.append('<div class="tmb"><i class="sticker"></i>'
                + '<div class="tmb-img">'
                    + '<img src="' + image.src + '" alt="' + image.alt + '" width="190" height="110">'
                    + '<div class="tmb-action"><!--noindex-->'
                        + '<button class="btn btn-red btn-lg" data-href="/go/vulkan/"><span>Играть</span></button>'
                        + '<!--/noindex--><br>'
                        + '<button class="btn btn-blue btn-md" data-href="/' + link.href + '"><span>Демо</span></button>'
                    + '</div>'
                + '</div>'
                + '<div class="tmb-title">' + link.title + '</div>'
            + '</div>');
        }

    };

    searchInput.on('input', function() { Search.init(this.value) });

    searchInput.on('keypress', function(e) {
        if (e.keyCode === 13) { return false; }
    });

})(jQuery);
