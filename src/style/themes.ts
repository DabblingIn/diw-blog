
interface IItemBoxStyle {
    backgroundColor: string,
    borderStyle: string,
    borderRadius: number,   // px
    borderColor: string,
    borderWidth: number,    // px
    boxShadow: string,
    padding: string,
    margin: string
};

interface IFormInputBoxStyle {
    display: string;
    padding: string;
    height: number;
    margin: string;
    backgroundColor: string;
    boxShadow: string;
    borderColor: string;
    borderWidth: number;
    borderStyle: string;
    borderRadius: number;
}

interface IArticleTitleStyle {
    fontFamily: string,
    fontWeight: number
}

interface IStyleTheme {
    backgroundColor: string;
    articleTitleStyle: IArticleTitleStyle;
    itemBoxStyle: IItemBoxStyle;
    formInputBoxStyle: IFormInputBoxStyle;
    navbarHeight: number;
    topBottomMargin: number;
};


const defaultItemBoxStyle: IItemBoxStyle = {
    backgroundColor: "white",
    borderStyle: "solid",
    borderRadius: 5,   // px
    borderColor: "#777",
    borderWidth: 1,    // px
    boxShadow: "2px 2px black",
    padding: "15px 23px",
    margin: "12px 2px"
};

const defaultFormInputBoxStyle: IFormInputBoxStyle = {
    display: "block",
    padding: "5px 9px",
    height: 32,
    margin: "7px 5px",
    backgroundColor: "white",
    boxShadow: "1px 1px black",
    borderColor: "#555",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 0,
};


export const defaultTheme:IStyleTheme = {
    backgroundColor: "linear-gradient(to bottom, #3af, skyblue)",     // blue gradient
    articleTitleStyle: {
        fontFamily: "Oswald, helvetica, sans-serif",
        fontWeight: 600
    },
    itemBoxStyle: defaultItemBoxStyle,
    formInputBoxStyle: defaultFormInputBoxStyle,
    navbarHeight: 80,
    topBottomMargin: 20
};
