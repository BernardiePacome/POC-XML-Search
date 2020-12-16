# Moteur de recherche du Flux RSS du monde

## Le logiciel suivant permet d'afficher et rechercher les articles dans le flux RSS du journal ***Le Monde*** (lemonde.fr).
### L'utilisateur peux rechercher des articles via la barre de recherche en entrant une chaine de charactères à l'aide du clavier.
### L'utilisateur peux voir un aperçu de l'article en cliquant le bouton "aperçu" dans la carte d'affichage de l'article et obtenir un lien direct vers l'article sur le site du journal ***Le Monde***.

# Installation 

#### Pré-requis
    - une installation de Docker
    - une installation de npm (Node Package Manager)


## Faire tourner le serveur back-end
dans le dossier racine du repo:

`docker-compose build`
`docker-compose up -d`

## Installer Angular CLI

`npm install -g @angular/cli`

ou

`npm install -g @angular/cli@11.0.4` pour être a la version de developpement 


ce programme a été developpé en Angular version 11.0.4

## Lancer l'interface utilisateur 

`cd angular2-rss-search-display`

`npm install`

`ng serve`

Ensuite, naviguer sur la page:

`localhost:4200`

# Nettoyage

À la fin de l'utilisation

`cd ..`

`docker-compose down`

