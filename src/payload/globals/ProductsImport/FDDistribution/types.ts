export interface FDDistribution {
  dane: Dane
}

export interface Dane {
  jednostki_miary: JednostkiMiary
  magazyny: Magazyny
  kategorie: Kategorie
  producenci: Producenci
  produkty: Produkty
}

interface JednostkiMiary {
  jm: JednostkaMiary[]
}

export interface JednostkaMiary {
  _id: string
  _skrot: string
}

interface Kategorie {
  k: Kategoria[]
}

export interface Kategoria {
  k_title: string
  k_description: string
  k_keywords: string
  _id: string
  _pozycja: string
  _produkt_waga: string
  _produkt_gabaryt: string
  _kgo: string
  _sciezka: string
}

interface Magazyny {
  m: Magazyn[]
}

export interface Magazyn {
  m_opis: string
  _id: string
  _nazwa: string
  _pozycja: string
  _dozwolone_zamowienia_zero: string
  _domyslny: string
}

interface Producenci {
  pr: Producent[]
}

export interface Producent {
  pr_title: string
  pr_description: string
  pr_keywords: string
  _id: string
  _nazwa: string
}

interface Produkty {
  p: Produkt[]
}

interface Zdjecia {
  z: Zdjecie[]
}

interface MagazynyIlosc {
  mi: MagazynIlosc[]
}

export interface Produkt {
  nazwa: string
  kod_producenta: string
  kod_ean: string
  html_title: string
  html_description: string
  html_keywords: string
  opis: string
  opis_filmy: string
  promocja_kategorii: string
  wyswietlanie_wariantow: string
  zdjecia: Zdjecia
  magazyny_ilosc: MagazynyIlosc
  _id: string
  _kategoria_id: string
  _producent_id: string
  _cena: string
  _wyswietlenie: string
  _zestaw: string
  _cena_poprzednia: string
  _stawka_vat: string
  _magazyn_id: string
  _ilosc: string
  _waga: string
  _gabaryt: string
  _ilosc_dokladnosc: string
  _ilosc_min: string
  _ilosc_przyrost: string
  _jm: string
}

export interface MagazynIlosc {
  _mid: string
  _ilosc: string
}

export interface Zdjecie {
  _url: string
  _glowne?: string
}
