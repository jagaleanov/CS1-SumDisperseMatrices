// JavaScript Document

//CLASES
class NodeCol {

    //next
    //down
    //col

    constructor(col) {
        this.col = col;
        this.next = null;
        this.down = new ListRow();
    }
}

class NodeRow {

    //next;
    //row;
    //value;

    constructor(row, value) {
        this.row = row;
        this.value = value;
        this.next = null;
    }
}

class ListCol {
    //head;

    constructor() {
        this.head = null;
    }

    issetCol(col) {
        var temp = this.head;
        while (temp !== null) {

            if (temp.col === col) {
                return true;
            }

            temp = temp.next;
        }
        return false;
    }

    insertCol(col) {
        var newNode = new NodeCol(col);
        if (!this.issetCol(col)) {
            if (this.head !== null) {//si la cabeza esta nula
                var temp = this.head;
                if (newNode.col.localeCompare(temp.col) > -1) {//si el primero en la lista es menor que el nuevo nodo
                    while (temp.next !== null) {
                        if (newNode.col.localeCompare(temp.next.col) > -1) {
                            temp = temp.next;
                        } else {
                            break;
                        }
                    }

                    if (newNode.next !== null && newNode.next.col.localeCompare(temp.col) > -1) {//si temp es el ultimo en la cola revisar si es menor (el bucle no diferencia si el ultimo es menor porque es el ultimo, no puede devolver null)
                        newNode.next = null;
                        temp.next = newNode;
                    } else {//si esta en medio del primero y el ultimo
                        //console.log(temp);
                        newNode.next = temp.next;
                        temp.next = newNode;
                    }
                } else {//si va antes del primero
                    var tempo = this.head;
                    this.head = newNode;
                    this.head.next = tempo;
                }
            } else {//si aun no existe lista
                this.head = newNode;
            }
        }
    }

    insertRow(col, row, value) {

        if (this.issetCol(col)) {
            var temp = this.head;
            while (temp !== null) {

                if (temp.col === col) {
                    temp.down.insertRow(row, value);
                    //console.log("cabeza down");
                    //console.log(temp.down.head);
                    if (temp.down.head === null) {
                        this.deleteCol(col);
                    }

                    break;
                }

                temp = temp.next;
            }
        }
    }

    sumRow(col, row, value) {

        if (this.issetCol(col)) {
            var temp = this.head;
            while (temp !== null) {

                if (temp.col === col) {
                    temp.down.sumRow(row, value);
                    //console.log("cabeza down");
                    //console.log(temp.down.head);
                    if (temp.down.head === null) {
                        this.deleteCol(col);
                    }

                    break;
                }

                temp = temp.next;
            }
        }
    }

    deleteRow(col, row) {

        if (this.issetCol(col)) {
            var temp = this.head;
            while (temp !== null) {

                if (temp.col === col) {
                    temp.down.deleteRow(row);
                    break;
                }

                temp = temp.next;
            }
        } else {
            alert("La materia " + col + " no existe");
        }
    }

    deleteCol(col) {

        var temp = this.head;
        if (temp.col !== col) {

            while (temp.next !== null) {
                if (temp.next.col === col) {//si el siguiente es el q buscamos

                    if (temp.next.down.head === null) {//si esta vacio

                        if (temp.next.next === null) {//es el ultimo
                            temp.next = null;
                        } else {//esta en medio de la lista y temp es el anterior
                            var removed = temp.next;
                            temp.next = removed.next;
                            removed.next = null;
                        }

                    } else {
                        alert("No se puede retirar la materia " + col + ", tiene estudiantes matriculados");
                    }
                    break;
                }

                temp = temp.next;
            }
        } else {//es el primero en la cola
            if (temp.down.head === null) {//esta vacio
                if (temp === this.head && temp.next === null) {//es unico
                    this.head = null;
                } else {
                    var removed = this.head;
                    this.head = temp.next;
                    removed.next = null;
                }
            } else {
                alert("No se puede retirar la materia " + col + ", tiene estudiantes matriculados");
            }
        }
    }

    printObj() {
        console.log(this.head);
    }

    print() {
        var temp = this.head;
        while (temp !== null) {

            console.log(temp.col);
            temp = temp.next;
            console.log("alumnos:");
        }
        console.log("");
    }

    getMaxCountRows() {
        var temp = this.head;
        var max = 0;
        while (temp !== null) {

            if (temp.down.countRows() > max) {
                max = temp.down.countRows();
            }

            temp = temp.next;
        }

        return max;
    }
}

class ListRow {
    //head;

    constructor() {
        this.head = null;
    }

    issetRow(row) {
        var temp = this.head;
        while (temp !== null) {

            if (temp.row === row) {
                return true;
            }

            temp = temp.next;
        }
        return false;
    }

    getRow(row) {
        var temp = this.head;
        while (temp !== null) {

            if (temp.row === row) {
                return temp;
            }

            temp = temp.next;
        }
        return null;
    }

    insertRow(row, value) {
        var newNode = new NodeRow(row, value);
        if (this.issetRow(row)) {
            this.deleteRow(row);
        }

        if (parseFloat(value) !== 0) {
            //alert("valor dif a 0 = "+value);

            if (this.head !== null) {//si la cabeza esta nula
                var temp = this.head;
                if (parseFloat(newNode.row)>=parseFloat(temp.row)) {//si el primero en la lista es menor que el nuevo nodo
                    while (temp.next !== null) {//mientras encuentre mas menores
                        if (parseFloat(newNode.row)>=parseFloat(temp.next.row)) {
                            temp = temp.next;
                        } else {
                            break;
                        }
                    }

                    if (newNode.next !== null && parseFloat(newNode.next.row)>=parseFloat(temp.row)) {//si temp es el ultimo en la cola revisar si es menor (el bucle no diferencia si el ultimo es menor porque es el ultimo, no puede devolver null)
                        newNode.next = null;
                        temp.next = newNode;
                    } else {//si esta en medio del primero y el ultimo
                        newNode.next = temp.next;
                        temp.next = newNode;
                    }
                } else {//si va antes del primero+

                        var tempo = this.head;
                        this.head = newNode;
                        this.head.next = tempo;
                       

                    
                   /*if(this.head>newNode)
                    {
                        var tempo = this.head;
                        this.head = newNode;
                        this.head.next = tempo;
                    }
                    else
                    {
                        var tempo = this.head;
                        this.head = newNode;
                        this.head.next = tempo;
                    }

                    /*if((this.head.compareTo(newNode))<0)
                    {
                        var tempo = this.head;
                        this.head = newNode;
                        this.head.next = tempo;
                    }
                    else 

                    {
                        alert("entro");
                        var tempo = this.head;
                        this.head = newNode;
                        newNode.next = tempo;
                    }
                    */
                }
            } else {//si aun no existe lista
                this.head = newNode;
            }
        }

        /*if (parseFloat(value) !== 0) {
            //alert("valor dif a 0 = "+value);

            if (this.head !== null) {//si la cabeza esta nula
                var temp = this.head;
                if (newNode.row.localeCompare(temp.row) > -1) {//si el primero en la lista es menor que el nuevo nodo
                    while (temp.next !== null) {//mientras encuentre mas menores
                        if (newNode.row.localeCompare(temp.next.row) > -1) {
                            temp = temp.next;
                        } else {
                            break;
                        }
                    }

                    if (newNode.next !== null && newNode.next.row.localeCompare(temp.row) > -1) {//si temp es el ultimo en la cola revisar si es menor (el bucle no diferencia si el ultimo es menor porque es el ultimo, no puede devolver null)
                        newNode.next = null;
                        temp.next = newNode;
                    } else {//si esta en medio del primero y el ultimo
                        newNode.next = temp.next;
                        temp.next = newNode;
                    }
                } else {//si va antes del primero+

                        var tempo = this.head;
                        this.head = newNode;
                        this.head.next = tempo;
                       

                    
                   /*if(this.head>newNode)
                    {
                        var tempo = this.head;
                        this.head = newNode;
                        this.head.next = tempo;
                    }
                    else
                    {
                        var tempo = this.head;
                        this.head = newNode;
                        this.head.next = tempo;
                    }

                    /*if((this.head.compareTo(newNode))<0)
                    {
                        var tempo = this.head;
                        this.head = newNode;
                        this.head.next = tempo;
                    }
                    else 

                    {
                        alert("entro");
                        var tempo = this.head;
                        this.head = newNode;
                        newNode.next = tempo;
                    }
                    
                }
            } else {//si aun no existe lista
                this.head = newNode;
            }
        }*/



    }

    sumRow(row, value) {

        if (value !== 0) {
            var newNode = new NodeRow(row, value);
            if (this.issetRow(row)) {
                value = parseFloat(this.getRow(row).value) + parseFloat(value);
                this.deleteRow(row);

                if (value !== 0) {
                    this.insertRow(row, value);
                }

            } else {
                this.insertRow(row, value);
            }
        }
    }

    deleteRow(row) {

        var temp = this.head;
        if (temp.row !== row) {

            while (temp.next !== null) {
                if (temp.next.row === row) {//si el siguiente es el q buscamos
                    if (temp.next.next === null) {//es el ultimo
                        temp.next = null;
                    } else {//esta en medio de la lista y temp es el anterior
                        var removed = temp.next;
                        temp.next = removed.next;
                        removed.next = null;
                    }

                    break;
                }

                temp = temp.next;
            }
        } else {//es el primero en la cola
            if (temp === this.head && temp.next === null) {//es unico
                this.head = null;
            } else {
                var removed = this.head;
                this.head = temp.next;
                removed.next = null;
            }
        }
    }

    printObj() {
        console.log(this.head);
    }

    print() {
        var temp = this.head;
        while (temp !== null) {

            console.log(temp.row);
            temp = temp.next;
        }
        console.log("");
    }

    countRows() {
        var temp = this.head;
        var counter = 0;
        while (temp !== null) {
            counter++;
            temp = temp.next;
        }

        return counter;
    }
}

//FUNCIONES
function printCols(matrix) {
    if (matrix === 'A') {
        matrixList = matrixListA;
    } else if (matrix === 'B') {
        matrixList = matrixListB;
    } else {
        matrixList = matrixListC;
    }

    var headNode = matrixList.head;
    var counter = 0;
    $("#tr_cols" + matrix).html("");

    while (headNode !== null) {

        if (counter > 0) {
            $("#tr_cols" + matrix).append('<td id="th_arrow_1"><img src="img/arrow-right.png" alt="right-arrow" width="29"></td>');
        }

        $("#tr_cols" + matrix).append('<td id="th_col_1"><table class="table-responsive" style="text-align: center"><tr><td>' + headNode.col + '</td>' + (headNode.next === null ? '<td><strong>.</strong></td>' : '<td colspan="2" class="p-1"></td>') + '</tr><tr><td colspan="2" class="p-1"></td></tr></table></td>');

        headNode = headNode.next;
        counter++;
    }
}

function printRows(matrix) {

    if (matrix === 'A') {
        matrixList = matrixListA;
    } else if (matrix === 'B') {
        matrixList = matrixListB;
    } else {
        matrixList = matrixListC;
    }

    var headNode = matrixList.head;
    var quantMaxRows = matrixList.getMaxCountRows();

    var stringHtml = "";

    $('#t_rows' + matrix).html("");

    for (var i = 0; i < quantMaxRows; i++) {
        stringHtml +=
                '<tr id="tr_arrow_' + i + matrix + '"></tr><tr id="tr_badge_' + i + matrix + '"></tr>';
    }

    $('#t_rows' + matrix).append(stringHtml);

    var counterCol = 0;
    while (headNode !== null) {

        var headNodeRow = headNode.down.head;

        var counterRow = 0;

        for (var j = 0; j < quantMaxRows; j++) {

            if (counterCol > 0) {//Añadir espacio a la izquierda debajo de la flecha de materia
                $('#tr_arrow_' + counterRow + matrix).append('<td class="td_row_' + counterCol + '"></td>');

                $('#tr_badge_' + counterRow + matrix).append('<td class="td_row_' + counterCol + '"></td>');
            }

            if (headNodeRow !== null) {
                $('#tr_arrow_' + counterRow + matrix).append('<td class="td_row_' + counterCol + '"><img src="img/arrow-down.png" alt="down-arrow" width="30"></td>');



                $('#tr_badge_' + counterRow + matrix).append('<td class="td_row_' + counterCol + '"><table class="table-responsive" style="text-align: center"><tr><td>' + headNodeRow.row + '</td><td><strong>' + headNodeRow.value + '</strong></td></tr><tr>' + (headNodeRow.next === null ? '<td colspan="2"><strong>.</strong></td>' : '<td colspan="2" class="p-1"></td>') + '</tr></table></td>');

                headNodeRow = headNodeRow.next;
            } else {
                $('#tr_arrow_' + counterRow + matrix).append('<td class="td_row_' + counterCol + '"></td>');


                $('#tr_badge_' + counterRow + matrix).append('<td class="td_row_' + counterCol + '"></td>');
            }

            counterRow++;
        }

        counterCol++;
        headNode = headNode.next;
    }
}

function insertRow(matrix) {
    if (matrix === 'A') {
        matrixList = matrixListA;
    } else if (matrix === 'B') {
        matrixList = matrixListB;
    }

    if ($("#colTxt" + matrix).val() !== "" && $("#rowTxt" + matrix).val() !== "" && $("#valueTxt" + matrix).val() !== "") {

        matrixList.insertCol($("#colTxt" + matrix).val());
        matrixList.insertRow($("#colTxt" + matrix).val(), $("#rowTxt" + matrix).val(), $("#valueTxt" + matrix).val());
        $("#colTxt" + matrix).val("");
        $("#rowTxt" + matrix).val("");
        $("#valueTxt" + matrix).val("");
        printCols(matrix);
        printRows(matrix);
        sum();
        $("#colTxt" + matrix).focus();
    } else {
        alert("Ingrese un dato valido");
        $("#colTxt" + matrix).focus();
    }
}

function sum() {
    matrixListC.head = null;

    var colA = matrixListA.head;
    while (colA !== null) {
        var rowA = colA.down.head;
        while (rowA !== null) {
            matrixListC.insertCol(colA.col);
            matrixListC.sumRow(colA.col, rowA.row, rowA.value);
            rowA = rowA.next;
        }

        colA = colA.next;
    }

    var colB = matrixListB.head;
    while (colB !== null) {
        var rowB = colB.down.head;
        while (rowB !== null) {
            matrixListC.insertCol(colB.col);
            matrixListC.sumRow(colB.col, rowB.row, rowB.value);
            rowB = rowB.next;
        }

        colB = colB.next;
    }

    console.log(matrixListC.head);

    printCols('C');
    printRows('C')
}

var matrixListA = new ListCol();
var matrixListB = new ListCol();
var matrixListC = new ListCol();



