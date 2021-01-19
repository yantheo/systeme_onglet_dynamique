(function () {
    /**
     * LORSQUE l'on clic sur un onglet 
     *      1) ON RETIRE la classe .active de l'onglet actuel actif
     *      2) J'AJOUTE la classe .active à l'onglet actuel
     *      3) ON RETIRE LA CLASS ACTIVE sur le contenu actif
     *      4) J'AJOUTE sur le contenu correspondant la classe actif sur mon click
     */

    var afficherOnglet = function (a, animations) {
        if (animations === undefined) {
            animations = true
        }
        var li = a.parentNode
        var div = a.parentNode.parentNode.parentNode
        var activeTab = div.querySelector('.tab_content.active') //contenu actif
        var affichage = div.querySelector(a.getAttribute('href')) //contenu à afficher

        if (li.classList.contains('active')) {
            return false
        }

        //1) ON RETIRE la class active de l'onglet actif
        div.querySelector('.tabs .active').classList.remove('active')
        //2) J'AJOUTE sur le contenu correspondant la classe actif sur mon click
        li.classList.add('active')

        //3) ON RETIRE LA CLASS ACTIVE sur le contenu actif
        //div.querySelector('.tab_content.active').classList.remove('active')
        //4) J'AJOUTE sur le contenu correspondant la classe actif sur mon click
        //div.querySelector(a.getAttribute('href')).classList.add('active')

        //ON AJOUTE LA CLASS fade sur l'élément actuf
        //A LA FIN DE L'ANIMATION 
        //ON RETIRA la class fade et active
        //ON AJOUTE la class active ET fade à l'élément à afficher
        //ET ON AJOUTE la class in

        if (animations) {
            activeTab.classList.add('fade')
            activeTab.classList.remove('in')
            transitionEnd = function () {
                this.classList.remove('fade')
                this.classList.remove('active')
                affichage.classList.add('active')
                affichage.classList.add('fade')
                affichage.offsetWidth
                affichage.classList.add('in')
                activeTab.removeEventListener('transitionend', transitionEnd)
                activeTab.removeEventListener('webkitTransitionEnd', transitionEnd)
                activeTab.removeEventListener('oTransitionEnd', transitionEnd)
            }
            activeTab.addEventListener('transitionend', transitionEnd)
            activeTab.addEventListener('webkitTransitionEnd', transitionEnd)
            activeTab.addEventListener('oTransitionEnd', transitionEnd)
        } else {
            affichage.classList.add('active')
            activeTab.classList.remove('active')
        }
    }

    var onglets = document.querySelectorAll('.tabs a')
    for (var i = 0; i < onglets.length; i++) {
        onglets[i].addEventListener('click', function (e) {
            afficherOnglet(this, true)
        })
    }

    /*
    * JE RECUPERE le hash de l'object window.location
           AJOUTE A LA CLASS ACTIVE SUR LE LIEN Href="hash"
           RETIRER LA CLASS ACTIVE SUR LES AUTRES ONGLET
           AFFICHER/MASQUER LES CONTENUS
    */

    var hashchange = function (e) {
        var hash = window.location.hash
        var a = document.querySelector('a[href="' + hash + '"]')
        if (a !== null && !a.parentNode.classList.contains('active')) {
            afficherOnglet(a, e!== undefined)
        }
    }
    window.addEventListener('hashchange', hashchange)
    hashchange
}()
)