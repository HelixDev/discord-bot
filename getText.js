module.exports = class GetGifs {
  constructor(action, target, author) {
    this.action = action;
    this.author = author;
    this.target = target
    
    
    this.killTexts= [
      `${this.author} has wasted ${this.target}`,
      `${this.author} has killed ${this.target}`,
      `${this.target} was killed by ${this.author}`,
      `${this.author} has sent ${this.target} to hell`,
    ];
    this.kissTexts = [
      `${this.author} is making out with ${this.target}`,
      `${this.author} has french kissed ${this.target}`,
      `${this.author} has kissed ${this.target}, and they've liked it`,
      
    ];
    this.punchTexts = [
      `${this.author} has punched ${this.target}`,
      `${this.author} is beating the shit out of ${this.target}`,
      `${this.author} is breaking ${this.target}'s face'`,
      `${this.author} is going berserk on ${this.target}`,
     
    ]
    
    this.hugTexts = [
      `${this.author} has hugged ${this.target}`,
    ]
    
    this.succTexts = [
      `${this.author} has succed ${this.target} off`,
      `${this.author} has given ${this.target} a smoothie`,
      
    ]
    
    this.lickTexts = [
      `${this.author} has licked ${this.target}`,
      `${this.author} has taken a taste of ${this.target}`,
      
    ]
    
    this.patTexts = [
      `${this.author} has patted ${this.target}`,
      
    ]
    
    this.slapTexts= [
      `${this.author} has slapped ${this.target}, bet it hurts`,
      `${this.author} has rebooted ${this.target}'s mind'`,
      `${this.author} has given ${this.target} a slap`,
      
    ]
    
    this.loveTexts = [
      `${this.author} is in love with ${this.target}`,
      `${this.author} has fallen for ${this.target}`,
      `${this.author} really loves ${this.target}`,
      
    ]
    
    this.feedTexts = [
      `${this.author} has given ${this.target} some food`,
      `${this.author} has fed ${this.target}, wonder how it tastes`,
      `${this.author} has given ${this.target} a taste of their food`,
      
    ]
  }


  
  actionText() {
    return this[`${this.action}Texts`][Math.floor(Math.random() * this[`${this.action}Texts`].length)]
  }
};
