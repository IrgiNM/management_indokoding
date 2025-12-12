const today = new Date().toISOString().split("T")[0];
export const thisMonth = today.slice(0,7);

export const dateFormat = (date:string) => {
    const dateNew = date.split("T")[0];
    return dateNew;
}

