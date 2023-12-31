class Cardapio {
    constructor() {
        this.items = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
  
        this.extras = {
            chantily: "cafe",
            queijo: "sanduiche"
        };
    }

    obterPrecoItem(codigo) {
      return this.items[codigo] || null;
    }
  
    itemExtra(codigo) {
      return !!this.extras[codigo];
    }
 
    adicionarPrincipalComExtra(codigo) {
      return this.extras[codigo];
    }    
  }
  
class CaixaDaLanchonete {
    constructor() {
        this.cardapio = new Cardapio();
    }
  
    calcularValorDaCompra(formaDePagamento, itens) {
        let valorTotal = 0;
  
        if (itens.length === 0) 
            return "Não há itens no carrinho de compra!";
        if (!['debito', 'credito', 'dinheiro'].includes(formaDePagamento)) 
            return "Forma de pagamento inválida!";
  
        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
            
        if (!this.cardapio.obterPrecoItem(codigo)) 
            return "Item inválido!";
        if (Number(quantidade) <= 0) 
            return "Quantidade inválida!";
        if (this.cardapio.itemExtra(codigo) && !itens.some(i => i.startsWith(this.cardapio.adicionarPrincipalComExtra(codigo)))) 
            return "Item extra não pode ser pedido sem o principal";

            valorTotal += this.cardapio.obterPrecoItem(codigo) * Number(quantidade);
        }
        
        if (formaDePagamento === 'dinheiro') {
             valorTotal *= 0.95;
        } else if (formaDePagamento === 'credito') {
             valorTotal *= 1.03;
        }

        return `R$ ${valorTotal.toFixed(2).replace('.',',')}`;               
    }    
  }
  
export { CaixaDaLanchonete };
