/* ESLint options */
/* exported vector */
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // Norme au carré d'un vecteur
    normSquared() {
        return this.x ** 2 + this.y ** 2;
    }

    // Norme d'un vecteur
    norm() {
        return Math.sqrt(this.normSquared());
    }

    // Fait de v un vecteur unitaire (de norme 1)
    normalize() {
        const norm = this.norm();
        // if (norm === 0) {
        //     throw new Error("On ne peut pas normaliser un vecteur nul");
        // }
        if (norm != 0){
            this.x /= norm;
            this.y /= norm;
        }
        
    }

    // Produit scalaire avec un autre vecteur
    scalaire(u) {
        return this.x * u.x + this.y * u.y;
    }

    // Représentation en chaîne de caractères
    toString() {
        return `(${this.x}, ${this.y})`;
    }

    // Addition de deux vecteurs
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    // Soustraction de deux vecteurs
    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    // Opposé d'un vecteur
    negate() {
        return new Vector(-this.x, -this.y);
    }

    // Multiplication d'un vecteur par un scalaire ou un autre vecteur
    scale(k) {
        return new Vector(k * this.x, k * this.y);
    }
}