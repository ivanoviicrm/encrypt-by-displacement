/**
 * Método de encriptación por desplazamiento.
 * Consiste en devolver un string similar, pero con los caracteres alterados, según su posición en el alfabeto.
 *
 * EJ: con displacement de 4 la letra A (posición 0) sería E (posición 4)
 */
class main {
  /** Alfabeto / Abecedario */
  private alphabet: string;
  /** Número de desplazamientos */
  private displacement: number;

  constructor(displacement = 1) {
    this.alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    this.displacement = displacement;
  }

  /**
   * Método de encriptación, retorna el texto con los caracteres desplazados n indices adelante
   * @param text - texto a encriptar
   * @return encryptedText - texto encriptado (caracteres desplazados)
   */
  public encrypt(text: string): string {
    let encryptedText = '';
    for (const char of text) {
      encryptedText += this.changeCharacter(char);
    }
    return encryptedText;
  }

  /**
   * Método de desencriptación, retorna el texto con los caracteres desplazados n indices atrás
   * @param encryptedText - texto a desencriptar
   * @return text - texto desencriptado (caracteres desplazados)
   */
  public decrypt(textEncrypted: string): string {
    let text = '';
    for (const char of textEncrypted) {
      text += this.changeCharacter(char, false);
    }
    return text;
  }

  /**
   * Método que altera el caracter recibido por su valor desplazado hacia delante o atrás.
   * En caso de no encontrarse el caracter en el alfabeto, devolvería el mismo caracter.
   * @param character - texto a desencriptar
   * @param isFoward - true = recorrer alfabeto hace adelante, false = hacia atrás
   * @return caracter desplazado o en su defecto el mismo
   */
  private changeCharacter(character: string, isFoward = true): string {
    return !!this.alphabet.includes(character)
      ? isFoward
        ? this.displaceCharacterFoward(character)
        : this.displaceCharacterBackward(character)
      : character; // NO char in alphabet, return same character
  }

  /**
   * Método que altera el caracter recibido por su valor desplazado.
   * Teniendo en cuenta la distancia hacia el final del alfabeto, en caso de ser menor al displacement
   * empezaría por 0.
   * @param character - letra que va a ser alterada / desplazada
   * @return letra alterada
   */
  private displaceCharacterFoward(character: string): string {
    const currentCharPosition = this.alphabet.indexOf(character);
    const distanceToAlphabetEnd =
      this.alphabet.length - 1 - currentCharPosition;
    return distanceToAlphabetEnd < this.displacement
      ? this.alphabet[0 + (this.displacement - distanceToAlphabetEnd - 1)]
      : this.alphabet[currentCharPosition + this.displacement];
  }

  /**
   * Método que altera el caracter recibido por su valor desplazado.
   * Teniendo en cuenta la distancia hacia el inicio del alfabeto, en caso de ser menor al displacement
   * empezaría por el final del alfabeto.
   * @param character - letra que va a ser alterada / desplazada
   * @return letra alterada
   */
  private displaceCharacterBackward(character: string): string {
    const currentCharPosition = this.alphabet.indexOf(character);
    return currentCharPosition < this.displacement
      ? this.alphabet[
          this.alphabet.length - (this.displacement - currentCharPosition)
        ]
      : this.alphabet[currentCharPosition - this.displacement];
  }
}

const app = new main(4);
const textToEncrypt = 'CODE IS AWSOME!!';

// ENCRYPT
const textEncrypted = app.encrypt(textToEncrypt);
console.log('Text encrypted ->', textEncrypted);
// DECRYPT
const textDecrypted = app.decrypt(textEncrypted);
console.log('Text decrypted ->', textDecrypted);
