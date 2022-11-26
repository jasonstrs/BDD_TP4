DROP TABLE IF EXISTS Client CASCADE;
CREATE TABLE Client (
	numeroclient INTEGER	NOT NULL,
	nomclient VARCHAR(20)	NOT NULL,
  prenomclient VARCHAR(20)	NOT NULL,
  adressecourrielclient VARCHAR(50),
  rueclient VARCHAR(50),
  villeclient VARCHAR(50),
  codepostalclient VARCHAR(6),
	PRIMARY KEY (numeroclient)
);

DROP TABLE IF EXISTS Telephone CASCADE;
CREATE TABLE Telephone (
	numeroclient INTEGER	NOT NULL,
	numerodetelephone VARCHAR(10)	NOT NULL,
	PRIMARY KEY (numeroclient, numerodetelephone),
  FOREIGN KEY(numeroclient) REFERENCES Client(numeroclient) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Fournisseur CASCADE;
CREATE TABLE Fournisseur (
	numerofournisseur INTEGER	NOT NULL,
	nomfournisseur VARCHAR(20),
  adressefournisseur VARCHAR(50),
	PRIMARY KEY (numerofournisseur)
);

DROP TABLE IF EXISTS Planrepas CASCADE;
CREATE TABLE Planrepas (
	numeroplan INTEGER	NOT NULL GENERATED ALWAYS AS IDENTITY,
	categorie VARCHAR(20)	NOT NULL,
  frequence INTEGER,
  nbpersonnes INTEGER,
  nbcalories INTEGER,
  prix FLOAT NOT NULL,
  numerofournisseur INTEGER NOT NULL,
  PRIMARY KEY (numeroplan),
  FOREIGN KEY(numerofournisseur) REFERENCES Fournisseur(numerofournisseur)
);

DROP TABLE IF EXISTS Abonner;
CREATE TABLE Abonner (
  numeroplan INTEGER NOT NULL,
  numeroclient INTEGER NOT NULL,
  duree INTEGER NOT NULL,
  PRIMARY KEY (numeroplan, numeroclient),
  FOREIGN KEY(numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE,
  FOREIGN KEY(numeroclient) REFERENCES Client(numeroclient) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Famille CASCADE;
CREATE TABLE Famille (
  numeroplan INTEGER NOT NULL,
  PRIMARY KEY (numeroplan),
  FOREIGN KEY(numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Vegetarien CASCADE;
CREATE TABLE Vegetarien (
  numeroplan INTEGER NOT NULL,
  typederepas VARCHAR(20),
  PRIMARY KEY (numeroplan),
  FOREIGN KEY(numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Pescarien CASCADE;
CREATE TABLE Pescarien (
  numeroplan INTEGER NOT NULL,
  typepoisson VARCHAR(20),
  PRIMARY KEY (numeroplan),
  FOREIGN KEY(numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Rapide;
CREATE TABLE Rapide (
  numeroplan INTEGER NOT NULL,
  tempsdepreparation INTEGER,
  PRIMARY KEY (numeroplan),
  FOREIGN KEY(numeroplan) REFERENCES Famille(numeroplan) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Facile;
CREATE TABLE Facile (
  numeroplan INTEGER NOT NULL,
  nbingredients INTEGER,
  PRIMARY KEY (numeroplan),
  FOREIGN KEY(numeroplan) REFERENCES Famille(numeroplan) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Ingredient CASCADE;
CREATE TABLE Ingredient (
  numeroingredient INTEGER NOT NULL,
  nomingredient VARCHAR(20) NOT NULL,
  paysingredient VARCHAR(20),
  PRIMARY KEY (numeroingredient)
);

DROP TABLE IF EXISTS Kitrepas CASCADE;
CREATE TABLE Kitrepas (
  numerokitrepas INTEGER NOT NULL,
  description VARCHAR(50),
  numeroplan INTEGER NOT NULL,
  PRIMARY KEY (numerokitrepas),
  FOREIGN KEY(numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Image CASCADE;
CREATE TABLE Image (
  numeroimage INTEGER NOT NULL,
  numerokitrepas INTEGER NOT NULL,
  donnees VARCHAR(100) NOT NULL,
  PRIMARY KEY (numeroimage, numerokitrepas),
  FOREIGN KEY(numerokitrepas) REFERENCES Kitrepas(numerokitrepas) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Contenir;
CREATE TABLE Contenir (
  numerokitrepas INTEGER NOT NULL,
  numeroingredient INTEGER NOT NULL,
  PRIMARY KEY (numerokitrepas, numeroingredient),
  FOREIGN KEY(numerokitrepas) REFERENCES Kitrepas(numerokitrepas) ON DELETE CASCADE,
  FOREIGN KEY(numeroingredient) REFERENCES Ingredient(numeroingredient) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Etape;
CREATE TABLE Etape (
  numerokitrepas INTEGER NOT NULL,
  descriptionetape VARCHAR(50),
  dureeetape INTEGER,
  composedeetape INTEGER,
  PRIMARY KEY (numerokitrepas),
  FOREIGN KEY(numerokitrepas) REFERENCES Kitrepas(numerokitrepas) ON DELETE CASCADE
);


INSERT INTO Client(numeroclient, nomclient, prenomclient, adressecourrielclient, rueclient, villeclient, codepostalclient)
VALUES
  (1, 'Dupont', 'Jean', 'jean.dupont@gmail.com', 'rue des lilas', 'Montréal', 'H3W2W3'),
  (2, 'Camus', 'Albert', 'albert@gmail.com', NULL, 'Québec', NULL);

INSERT INTO Telephone(numerodetelephone, numeroclient)
VALUES ('1234567891', 1), ('9876543210',2);

INSERT INTO Fournisseur(numerofournisseur, nomfournisseur, adressefournisseur)
VALUES (1, 'QC Transport', 'Rue strabourgeoise'), (2, NULL, 'rue montmorency');

INSERT INTO Planrepas(categorie, frequence, nbpersonnes, nbcalories, prix, numerofournisseur)
VALUES
  ('cétogène', 3, 6, 1200, 50, 1),
  ('végé', 2, 4, 600, 15, 1);


INSERT INTO Abonner(numeroplan, numeroclient, duree)
VALUES (1, 1, 10), (2, 2, 6);

INSERT INTO Famille(numeroplan)
VALUES (1), (2);

INSERT INTO Vegetarien(numeroplan, typederepas)
VALUES (2, 'Salade'), (1, 'Fromage');

INSERT INTO Pescarien(numeroplan, typepoisson)
VALUES (1, 'Saumon'), (2, 'Truite');


INSERT INTO Rapide(numeroplan, tempsdepreparation)
VALUES (1, 10), (2, 20);

INSERT INTO Facile(numeroplan, nbingredients)
VALUES (1, 3), (2, 5);

INSERT INTO Ingredient(numeroingredient, nomingredient, paysingredient)
VALUES (1, 'Champignon', 'France'), (2, 'Pommes de terre', 'Canada');

INSERT INTO Kitrepas(numerokitrepas, description, numeroplan)
VALUES
  (1,NULL,1),
  (2,'Un bon kit repas composé de champignon', 2);

INSERT INTO Image(numeroimage, numerokitrepas, donnees)
VALUES (1, 1, '2573826730948'), (2, 1, '679303787');

INSERT INTO Contenir(numerokitrepas, numeroingredient)
VALUES (2,2), (2,1);

INSERT INTO Etape(numerokitrepas, descriptionetape, dureeetape, composedeetape)
VALUES
  (1,'Mélanger les ingrédients', 10, NULL),
  (2,'Mixer', 2, 1);
