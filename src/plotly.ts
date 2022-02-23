export const chartConfig = () => {
    return {responsive: true}
}

export const layoutConfig = () => {
    //
    return {
        showlegend: false,
        images: [
            {
                x: 1,
                y: 1,
                sizex: 0.5,
                sizey: 0.5,
                source: "https://www.raptorsrepublic.com/wp-content/uploads/2023/01/Logo-wordmark-black.png",
                xanchor: "right",
                xref: "paper",
                yanchor: "bottom",
                yref: "paper"
            }
        ],
    }
}
