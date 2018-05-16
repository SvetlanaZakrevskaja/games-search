# Search

Script searches through LS games JSON.

## Usage

* Create chunk 'gamesToJSON' with content:
```
{
 "image": [
    {
        "src":"[[+tv.game_img]]",
        "alt":"[[+tv.game_img_title]]"
    }
 ],
 "link": [
    {
        "href":"[[~[[+id]]]]",
        "title":"[[+pagetitle]]"
    }
 ]
},
```
* Create chunk 'gamesToJSONLast':
```
{
 "image": [
    {
        "src":"[[+tv.game_img]]",
        "alt":"[[+tv.game_img_title]]"
    }
 ],
 "link": [
    {
        "href":"[[~[[+id]]]]",
        "title":"[[+pagetitle]]"
    }
 ]
}
```

* Add chunk 'searchForm' with content (or customize existing):

```
For azino:
<form class="form-search">
    <div class="form-group">
        <div class="fld-wrap">
            <input name="search" id="search" value="" class="fld" placeholder="Поиск игры">
        </div>
    </div>
</form>

For vulcan:
<form class="form-search form-search--optimized">
    <div class="form-group">
        <div class="fld-wrap fld-wrap-md">
            <input name="search" id="search" value="" class="fld fld-search" placeholder="Поиск...">
            <span class="btn-clear-input"></span>
        </div>
    </div>
</form>

<form>
    <input name="search" id="search" value="" class="sb-search__input" placeholder="НАЙТИ ИГРУ ...">
</form>
```

* Add code in 'scripts'/'footer_scripts' chunk, ex.:
```
<script src="[[!++site_url]]assets/templates/theme/js/search.a.js"></script>
<script>
    var gamesListHtml = [ [[getResources? &showHidden=`1` &tpl=`gamesToJSON` &tplLast=`gamesToJSONLast` &limit=`` &includeContent=`1` &includeTVs=`1` &processTVs=`1` &parents=`3` &hideContainers=`1` &sortby=`{"menuindex":"ASC"}`]] ]
    localStorage.setItem('games', JSON.stringify(gamesListHtml));
    localStorage.setItem('redirect', '[[$url]]'); // if it exists
</script>
```

**!!! Make sure to have correct path to the script. For azino - search.a.js, for vulkan brands - search.v.js or search.v24.js.
Remove set for redirect url if don't need one.**

* If vulcan brands has js code in order to have a click on the buttons, change it:
```
$(document).on('click',  '.tmb-action button', function(){
  var url = $(this).attr('data-href');
  window.location.href=url;
});
```

* Copy search.a.js, search.v.js || search.v24.js file from repo compile folder to theme js folder.

* Change snippet call [[!SimpleSearchForm? &tpl=`MySForm` &landing=`114`]] to 'searchForm' chunk call in 'Homepage' template - [[$searchForm]].

* Remove search snippet call from 'text' and 'Demo-game' templates if needed.

* Remove Search-results Page

* Clear browser cache, test if it works.

### Additional:
 - put to a variable another classes if needed:
        gamesListBlock = $('.game-list');
 - working examples - https://4aziino777.org

## Author
* Lana Zakrevska

## Versions
* 1.0.0 - basic search through the games
* 1.0.1 - Enter key press is banned
* 1.0.2 - added 2 more versions for different sites
