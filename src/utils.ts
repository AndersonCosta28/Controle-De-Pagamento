export function diasNoMes(): number {
    const data = new Date();
    const diasDoMes = new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();
    return diasDoMes;
}