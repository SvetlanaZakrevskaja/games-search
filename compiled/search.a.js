!function(i){var e=i("#search"),n=i(".game-list"),s={init:function(e){var a=e.toLowerCase(),t=a.length;2<t?this.getGames(a):t||this.parseGamesFromLS()},parseGamesFromLS:function(){var e=localStorage.getItem("games");e=i.parseJSON(e),n.empty(),i.map(e,function(e){var a=e.image[0],t=e.link[0];s.appendGames(a,t)})},getGames:function(e){var a=localStorage.getItem("games");a&&this.getResults(a,e)},getResults:function(e,t){e=i.parseJSON(e);var a=i.map(e,function(e){var a=e.link[0].title;return-1!==(a=a.toLowerCase()).indexOf(t)?e:null});i.isEmptyObject(a)?(n.empty(),n.append("<p>По вашему запросу ничего не найдено. Попробуйте ввести похожие по смыслу слова, чтобы получить лучший результат.</p>")):this.prepareGames(a)},prepareGames:function(e){n.empty(),i.map(e,function(e){var a=e.image[0],t=e.link[0];s.appendGames(a,t)})},appendGames:function(e,a){n.append('<div class="game_container"><div class="game_img"><img src="'+e.src+'" alt="'+e.alt+'" width="284" height="164"></div><a href="'+a.href+'" class="game_info">'+a.title+'</a><div class="game_hover_container"><div class="game_hovered_mane"><a href="'+a.href+'" class="game_hover_demo">Играть</a></div></div></div>')}};e.on("input",function(){s.init(this.value)}),e.on("keypress",function(e){if(13===e.keyCode)return!1})}(jQuery);