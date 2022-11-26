/* 4.1: Affichez les numéros (numeroclient) et les noms (nomclient) des clients qui
ont commandé un repas avec un prix compris entre 20 dollars et 40 dollars. (2pts) */

SELECT DISTINCT C.numeroclient, C.nomclient
FROM Client C, Planrepas P, Abonner A
WHERE
 	C.numeroclient = A.numeroclient
AND P.numerorepas = A.numerorepas
AND P.prix BETWEEN 20 AND 40;

/* 4.2: Afficher les numéros des plans repas (numeroplan) qui ne proviennent pas du
fournisseur au nom de 'QC Transport'. (2pts)*/

SELECT P.numeroplan
FROM Planrepas P, Fournisseur F
WHERE
  P.numerofournisseur = F.numerofournisseur
    AND F.nomfournisseur <> 'QC Transport';

/* 4.3:  Affichez la liste des numéros des plans Famille (numeroplan) dont la catégorie
du plan repas correspond à 'cétogène'. (2pts) */

SELECT P.numeroplan
FROM Famille F, Planrepas P
WHERE
  F.numeroplan = P.numeroplan
    AND P.categorie = 'cétogène';

/* 4.4:  Affichez le nombre de fournisseurs n’ayant pas de nom dans leur dossier
(la valeur de nomfournisseur est NULL). (2pts) */

SELECT COUNT(*) AS 'Nombre de fournisseurs sans nom'
FROM Fournisseur
WHERE  nomfournisseur = NULL;

/* 4.5:  Affichez les noms des fournisseurs (nomfournisseur) ayant fait des livraisons
de plans repas dont le montant est supérieur aux livraisons faites par le fournisseur
dont le nom est 'AB Transport'. (2pts) */

SELECT DISTINCT F.nomfournisseur
FROM Planrepas P, Fournisseur F
WHERE
  P.numerofournisseur = F.numerofournisseur
    AND (
      SELECT SUM(P2.prix)
      FROM Planrepas P2
      WHERE P2.numerofournisseur = F.numerofournisseur
    ) > (
      SELECT SUM(P3.prix)
      FROM Planrepas P3, Fournisseur F3
      WHERE
        P3.numerofournisseur = F3.numerofournisseur
			    AND F3.nomfournisseur = 'AB Transport'
    );


/* 4.6: Affichez les noms des fournisseurs (nomfournisseur), les adresses (adressefournisseur)
et le montant total des prix des livraisons de plans repas des fournisseurs ayant les deux plus
larges montants de livraison sur la plateforme. (2pts) */

SELECT F.nomfournisseur, F.adressefournisseur, SUM(P.prix)
FROM Fournisseur F, Planrepas P
WHERE F.numerofournisseur = P.numerofournisseur
GROUP BY F.numerofournisseur, F.adressefournisseur
ORDER BY SUM(P.prix) DESC
LIMIT 2;

/* 4.7:  Affichez le nombre de kit repas qui n’ont jamais été réservés chez les fournisseurs. (2pts) */

SELECT COUNT(K.numerorepas) AS 'Nombre de kit repas jamais ayant été réservés'
FROM Kitrepas K
MINUS
SELECT K2.*
FROM Fournisseur F, Planrepas P, Kitrepas K2
WHERE
  F.numerofournisseur = P.numerofournisseur
	  AND K2.numeroplan = P.numeroPlan;

/* 4.8: Affichez les numéros (numeroclient), les noms (nomclient) et les prénoms (prenomclient)
des clients dont le prénom ne commence pas par une voyelle (en majuscule ou en minuscule)
et qu’ils habitent (villeclient) à la même adresse (adressefournisseur) que
le fournisseur 'Benjamin'. Ordonnez ces clients alphabétiquement selon le nom. (2pts) */

SELECT C.numeroclient, C.nomclient, C.prenomclient
FROM Client C
WHERE
      SUBSTRING(C.prenomclient, 1, 1) NOT IN ('A', 'E', 'I', 'O', 'U', 'Y', 'a', 'e', 'i', 'o', 'u', 'y')
      AND C.villeclient = (
        SELECT F.adressefournisseur
        FROM Fournisseur F
        WHERE F.nomfournisseur = 'Benjamin'
      )
ORDER BY C.nomclient ASC;


/* 4.9:  Affichez le pays des ingrédients (paysingredient) et le nombre d’ingrédients par pays dont
le paysingrédient ne contient pas la lettre g à la troisième position de la fin; triés par ordre
décroissant selon le pays de l’ingrédient (paysingredient). (2pts) */

SELECT paysingredient, COUNT(*) AS 'Nombre ingrédients'
FROM Ingredient
WHERE paysingredient NOT LIKE ('%g _ _')
GROUP BY paysingredient
ORDER BY paysingredient DESC;

/* 4.10: Créez une vue 'V_fournisseur' contenant la catégorie du plan repas 'V_catégorie',
l’adresse du fournisseur 'V_adresse' et le total des prix de tous les plans repas desservis
par ce fournisseur 'V_tot'. Cette vue doit uniquement contenir les fournisseurs dont V_tot est
supérieur à 12 500$ et dont le nom de la catégorie du plan repas contient la lettre 'e' et la
lettre 'o' à la troisième position de la fin; triés par ordre croissant selon le nom de la
catégorie du plan repas et par ordre décroissant selon 'V_tot'. Finalement, afficher le
résultat de cette vue. (5pts) */

CREATE OR REPLACE VIEW V_fournisseur(V_catégorie,V_adresse,V_tot) AS
SELECT pr.categorie, f.adressefournisseur, SUM(pr.prix)
FROM Planrepas pr, Fournisseur f
WHERE
  f.numérofournisseur = pr.numérofournisseur
    AND pr.categorie LIKE ('%e%')
    AND pr.categorie LIKE ('%o_ _')
GROUP BY pr.categorie, f.adressefournisseur
HAVING SUM(pr.prix) > 12500
ORDER BY pr.categorie, SUM(pr.prix) desc;
