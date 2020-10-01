module.exports = class GetGifs {
  constructor() {
    this.killGifs = [
      "https://media1.tenor.com/images/af100ce94589c2f10c7aaadb3a5b27cb/tenor.gif",
      "https://media1.tenor.com/images/7e310937d073dc3e03d9744328702a2c/tenor.gif",
      "https://media1.tenor.com/images/f16e5bcbac25180fa09b9d5c405b3f95/tenor.gif",
      "https://media1.tenor.com/images/cdba091f6ea0e07cd32ddea41d3ceea7/tenor.gif",
      "https://media1.tenor.com/images/8e3429d6e096caa16a07d7372d913d3d/tenor.gif",
      "https://media1.tenor.com/images/e5cd323d3f6acac9867c64e7374fe5f0/tenor.gif"
    ];
    this.kissGifs = [
      "https://media2.giphy.com/media/G3va31oEEnIkM/giphy.gif",
      "https://media1.tenor.com/images/f5167c56b1cca2814f9eca99c4f4fab8/tenor.gif",
      "https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif",
      "https://media.giphy.com/media/ZRSGWtBJG4Tza/giphy.gif",
      "https://media.giphy.com/media/oHZPerDaubltu/giphy.gif",
      "https://acegif.com/wp-content/uploads/anime-kiss-m.gif",
      "https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif",
      "https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif",
      "https://media0.giphy.com/media/KH1CTZtw1iP3W/source.gif"
    ];
    this.punchGifs = [
      "https://media1.tenor.com/images/bb4b7a7559c709ffa26c5301150e07e4/tenor.gif",
      "https://media.giphy.com/media/11HeubLHnQJSAU/giphy.gif",
      "https://media1.tenor.com/images/662753a5bb939015c3afd384fea42938/tenor.gif",
      "https://media1.tenor.com/images/85e64e325ad4d296c56d3e1ef84f45ee/tenor.gif",
      "https://media1.tenor.com/images/84178329bc205d78eec894f4bf6370d1/tenor.gif",
      "https://media1.tenor.com/images/2487a7679b3d7d23cadcd51381635467/tenor.gif",
      "https://media1.tenor.com/images/31686440e805309d34e94219e4bedac1/tenor.gif",
      "https://media1.tenor.com/images/79cc6480652032a20f1cb5c446b113ae/tenor.gif",
    ]
    
    this.hugGifs = [
      "https://media1.tenor.com/images/6db54c4d6dad5f1f2863d878cfb2d8df/tenor.gif",
      "https://media1.tenor.com/images/7e30687977c5db417e8424979c0dfa99/tenor.gif",
      "https://media1.tenor.com/images/daffa3b7992a08767168614178cce7d6/tenor.gif",
      "https://media1.tenor.com/images/c7efda563983124a76d319813155bd8e/tenor.gif",
      "https://media1.tenor.com/images/b62f047f8ed11b832cb6c0d8ec30687b/tenor.gif"
    ]
    
    this.succGifs = [
      "https://media1.tenor.com/images/fa57b123cd00e9da81138998e9469c05/tenor.gif",
      "https://media1.tenor.com/images/76624038f138085c7717062fa8a3d547/tenor.gif",
    ]
    
    this.lickGifs = [
      "https://media1.tenor.com/images/ed453c0cb38449f3fed9cc336a962772/tenor.gif",
      "https://media1.tenor.com/images/2b0303a918ec13cecc7fd4e84b63d160/tenor.gif",
      "https://media1.tenor.com/images/5f73f2a7b302a3800b3613095f8a5c40/tenor.gif",
    ]
    
    this.patGifs = [
      "https://media1.tenor.com/images/da8f0e8dd1a7f7db5298bda9cc648a9a/tenor.gif?itemid=12018819",
      "https://media1.tenor.com/images/0d2fb6ad9a6d71c3a018c0b37ffca50b/tenor.gif?itemid=16121044",
      "https://media1.tenor.com/images/bfdeb9ec7f89aad86170d06fe4189bec/tenor.gif?itemid=16085314",
      "https://media1.tenor.com/images/5466adf348239fba04c838639525c28a/tenor.gif?itemid=13284057",
      "https://media1.tenor.com/images/291ea37382e1d6cd33349c50a398b6b9/tenor.gif?itemid=10204936"
    ]
    
    this.slapGifs = [
      "https://media1.tenor.com/images/299366efafc95bc46bfd2f9c9a46541a/tenor.gif?itemid=16819981",
      "https://media1.tenor.com/images/b221fb3f50f0e15b3ace6a2b87ad0ffa/tenor.gif?itemid=8576304",
      "https://media1.tenor.com/images/b48b40f955e99b429231fa9f11f2b9a5/tenor.gif?itemid=13893830",
      "https://media1.tenor.com/images/74db8b0b64e8d539aebebfbb2094ae84/tenor.gif?itemid=15144612",
      "https://media1.tenor.com/images/b797dce439faddabca83352b2c2de550/tenor.gif?itemid=17897223"
    ]
    
    this.loveGifs = [
      "https://media1.tenor.com/images/110dbddfd3d662479c214cacb754995d/tenor.gif?itemid=10932413",
      "https://media1.tenor.com/images/42922e87b3ec288b11f59ba7f3cc6393/tenor.gif?itemid=5634630",
      "https://media1.tenor.com/images/cc805107341e281102a2280f08b582e0/tenor.gif?itemid=13925386",
      "https://media1.tenor.com/images/8cbe0edadc12ca1056d5eb685a4c27f6/tenor.gif?itemid=14518537",
    ]
    
    this.feedGifs = [
      "https://media1.tenor.com/images/d08d0825019c321f21293c35df8ed6a9/tenor.gif?itemid=9032297",
      "https://media1.tenor.com/images/571da4da1ad526afe744423f7581a452/tenor.gif?itemid=11658244",
      "https://media1.tenor.com/images/2a6959e7cfc16a968fd39e5b6b3c73f5/tenor.gif?itemid=17196820"
    ]
  }


  
  actionGif(act) {
    return this[`${act}Gifs`][Math.floor(Math.random() * this[`${act}Gifs`].length)]
  }
};
