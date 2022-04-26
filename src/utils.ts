export function QntdDiasNoMes(): number {
    const data = new Date();
    const diasDoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();
    return diasDoMes;
}

export function Quantidade_de_dias_do_mes_exceto_domingo():number {
    const Array_De_Datas_Exceto_Domingo = [];
    const data = new Date();
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const Ultima_data_do_mes = new Date(ano, mes, 0).getDate();

    for (let index = 1; index <= Ultima_data_do_mes; index++) {
        let data_index = new Date(ano, mes, index);
        if (data_index.getDay() != 0)
            Array_De_Datas_Exceto_Domingo.push(data_index.toLocaleDateString('pt-br'));
    }

//    console.log(Array_De_Datas_Exceto_Domingo.length)
    return Array_De_Datas_Exceto_Domingo.length;
}