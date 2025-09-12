import { configureStore, createSlice } from "@reduxjs/toolkit";

// ✅ Step 1: Load cart data from localStorage if available
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];


const productsSlice = createSlice({
    name : 'Products',
    initialState : {
        Veg : [
             { id: 1, name: "VegBiryani", price:200, image: "https://kannanskitchen.com/wp-content/uploads/2021/04/DSC_1079_1.jpg", description: "A fragrant blend of basmati rice, garden-fresh veggies, and served with rich flavors in every bite.🌿✨"},
    { id: 2, name: "PannerBiryani", price: 250, image: "https://tse1.mm.bing.net/th/id/OIP.0gccyzp1GR_Ss9C_wNf8DgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Soft paneer cubes cooked with basmati rice, bringing a rich and flavorful twist to traditional biryani flaovoured rice.🧀🌸" },
    { id: 3, name: "MushroomBiryani", price: 300, image: "https://tse4.mm.bing.net/th/id/OIP.2hg5xS1nCgtSa9x6EFn6QwHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Aromatic basmati rice layered with tender mushrooms, fragrant spices, and fresh herbs,flavoured rice.🍄🌿" },
    { id: 4, name: "Handi Biryani", price: 279, image: "https://assets.limetray.com/assets/image_manager/uploads/5128/kathal%202.jpg", description: "Aromatic basmati rice slow-cooked in a traditional clay pot with rich spices and herbs, giving it a smoky and earthy flavor.🏺🔥" },
    { id: 5, name: "Kaju Biryani", price: 279, image: "https://assets.faasos.io/behrouzbiryani-react/production/veg-biryani-online.jpg", description: "Fragrant basmati rice cooked with roasted cashews, aromatic spices, and herbs, offering a rich and nutty flavor,Flavoured Rice.🌰👑" },
    { id: 6, name: "Curd Rice", price: 150, image: "https://tse1.mm.bing.net/th/id/OIP.cJzQ-h7MG0O2-osrDcUuLgHaEn?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", description: "A refreshing South Indian dish made with creamy yogurt mixed with rice, tempered with mustard seeds,giving a cooling and tangy flavor.🥛🍃" },
    { id: 7, name: "Zeera Rice", price: 300, image: "https://thumbs.dreamstime.com/b/jeera-rice-basmati-rice-flavoured-fried-cumin-seeds-fresh-jeera-rice-basmati-rice-flavoured-fried-cumin-seeds-195487475.jpg", description: "Fragrant basmati rice tempered with cumin seeds, giving it a light, earthy, and aromatic flavor. 🌾✨" },
    { id: 8, name: "AvakayaPappu Annam", price: 150, image: "https://telugu.cdn.zeenews.com/telugu/sites/default/files/Muddapappuavakaihome.jpg", description: "A traditional Andhra favorite – tangy mango pickle mixed with lentils and rice, bursting with spicy flavors. 🌶️🥭" },
    { id: 9, name: "Pudhina Rice", price: 180, image: "https://tse4.mm.bing.net/th/id/OIP.T5E0vscvT8wbPbwTmaIa8AHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", description: "A refreshing rice dish cooked with fresh mint leaves, green chilies, and spices for a cooling taste. 🌿✨" },
    { id: 10, name: "Lemon Rice", price: 200, image: "https://www.flavourstreat.com/wp-content/uploads/2020/12/turmeric-lemon-rice-recipe-02.jpg", description: "Zesty and refreshing rice flavored with lemon juice, curry leaves, and mustard seeds – a true South Indian classic. 🍋🍃" },
  ],
  Nonveg : [
          { id: 1, name: "Chicken Biryani", price: 250, image: "https://static.vecteezy.com/system/resources/thumbnails/040/708/398/small_2x/ai-generated-royal-feast-master-the-art-of-chicken-biryani-at-home-generative-ai-photo.jpg", description: "Aromatic basmati rice layered with tender chicken, slow-cooked with rich spices for a flavorful royal feast. 🌿✨" },
    { id: 2, name: "Mutton Biryani", price: 300, image: "https://tse1.mm.bing.net/th/id/OIP.RzJfmrSX00YO7lRLmf7GiAHaE8?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Tender mutton pieces layered with fragrant basmati rice and rich spices, slow-cooked to perfection." },
    { id: 3, name: "Fish Biryani", price: 300, image:"https://st.depositphotos.com/5653638/52155/i/450/depositphotos_521555548-stock-photo-authentic-fish-biryani-served-white.jpg", description: "Flavorful basmati rice cooked with spiced fish pieces for a unique coastal twist flavoured rice." },
    { id: 4, name: "Prawns Biryani", price: 450, image: "https://img.freepik.com/free-photo/biryani-with-shrimp-tasty-delicious-prawns-biryani-top-view_158388-3417.jpg?size=626&ext=jpg ", description: "Juicy prawns infused with spices and layered in fragrant rice for a rich seafood delight." },
    { id: 5, name: "Egg Biryani", price: 150, image: "https://spicecravings.com/wp-content/uploads/2020/10/Egg-Biryani-Featured-1.jpg", description: "A wholesome biryani with boiled eggs, aromatic rice, and mild spices for a light yet tasty meal." },
    { id: 6, name: "Chicken Mandi", price: 350, image:"https://tse2.mm.bing.net/th/id/OIP.AF2dbzFUmlkevovG09EQOgHaE7?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" , description: "Smoky, spiced chicken served over aromatic rice in authentic Arabian mandi style." },
    { id: 7, name: "Mutton Mandi", price: 500, image: "https://tse2.mm.bing.net/th/id/OIP.F8B0jCbC-006p8SXFYb5CwHaEK?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Succulent mutton slow-cooked with mandi spices, served on a bed of flavorful rice flavoured rice." },
    { id: 8, name: "Mutton jucy Mandi", price: 750, image: "https://tse1.mm.bing.net/th/id/OIP.IzsrBFH9U75VAEBnZgGoiQHaFN?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Extra-tender mutton cooked in rich mandi flavors, bursting with juiciness in every bite." },
    { id: 9, name: "chicken 65 Mandi", price: 400, image: "https://i.pinimg.com/736x/80/8e/68/808e6822c323c00621851c33a68cad55.jpg", description: "Crispy, spicy Chicken 65 pieces paired with aromatic mandi rice for a fiery feast flavoured Rice." },
    { id: 10, name: "Chicken Wings Mandi", price: 400, image: "https://images.deliveryhero.io/image/talabat/MenuItems/Chicken_wings_with_rice638321108711956344.jpg", description: "Smoky grilled chicken wings served with fragrant mandi rice for a bold, tasty combo." },
  ], 
  Vegstraters : [
    { id: 1, name: "Panner Butter Masal + roti", price: 250, image: "https://tse2.mm.bing.net/th/id/OIP.RUALvlvYGY7pAN4lFjex-wHaG5?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description:"Soft paneer cubes in rich buttery tomato gravy, served with roti." },
    { id: 2, name: "VegFired Rice", price: 120, image: "https://i2.wp.com/vegecravings.com/wp-content/uploads/2016/03/veg-fried-rice-step-by-step-recipe.jpg?w=2418&quality=65&strip=all&ssl=1", description: "Fluffy rice tossed with fresh vegetables and subtle spices." },
    { id: 3, name: "Veg Manchurian", price: 150, image:"https://th.bing.com/th/id/R.3ca86d2d5e3a0e4645128c54b4bbed2b?rik=lpFI9h64nT%2bDjQ&riu=http%3a%2f%2fwww.maatamanti.com%2fwp-content%2fuploads%2f2017%2f10%2fVeg-Manchurian2.jpg&ehk=KtonpDL9msc94fHJFcmzBfrYHqPLc6qag7ulbgCpwBk%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1", description: "Crispy vegetable balls in a tangy, spicy Indo-Chinese sauce." },
    { id: 4, name: "Crispy Corn", price: 250, image: "https://vismaifood.com/storage/app/uploads/public/31d/fd6/014/thumb__1200_0_0_0_auto.jpg", description: "Crunchy corn kernels fried to perfection with flavorful spices." },
    { id: 5, name: "Panner Majestic", price: 210, image: "https://tse3.mm.bing.net/th/id/OIP.0N7PYk4o7rvtV3FhGiUIGQHaE8?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Paneer cooked in a mildly spiced, creamy, and aromatic sauce." },
    { id: 6, name: "Panner chilli Dry", price: 210, image:"https://www.mydelicious-recipes.com/home/getogimage?id=188" , description: "Stir-fried paneer with bell peppers and chili, dry and spicy." },
    { id: 7, name: "Mushroom Manchurian", price: 210, image: "https://img.freepik.com/premium-photo/mushroom-manchurian-dried-black-bowl-dark-background-indo-chinese-dish-with-fried-mushrooms-peppe_908985-33519.jpg?w=2000", description: "Golden mushroom balls in a deliciously tangy Indo-Chinese sauce." },
    { id: 8, name:"Baby Corn Manchurian", price: 250, image: "https://tse4.mm.bing.net/th/id/OIP.BR6hxD3v9rf458NLW4i3fgHaEJ?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Tender baby corn in a sweet and spicy Manchurian sauce." },
    { id: 9, name: "Gobi-65", price: 180, image: "https://tse1.mm.bing.net/th/id/OIP.IDHXlupSSpOAbPuhmkSNyQHaHa?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Crispy cauliflower florets coated with spicy, zesty masala." },
    { id: 10, name: "Panner Tikka", price: 210, image: "https://tse2.mm.bing.net/th/id/OIP.DH0KMPXHqWYW28hEc7OXLQHaE8?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Marinated paneer cubes grilled to smoky perfection." },
  ], 
  Nonvegstraters : [
    { id: 1, name: "Tandoori Chicken", price: 250, image: "https://wallpaperaccess.com/full/4323684.jpg", description:"Juicy chicken marinated in spices and grilled to perfection. 🍗🔥" },
    { id: 2, name: "Chicken Lollipop", price: 300, image: "https://tse3.mm.bing.net/th/id/OIP.K2lnVgPEj0-LL0gYYkLA_AHaE5?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Crispy fried chicken wings with a spicy tangy coating. 🍖🌶️" },
    { id: 3, name: "Apollo Fish", price: 300, image:"https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-Apollo-Fish.jpg", description: "Golden fried fish fillets with a zesty Indo-Chinese flavor. 🐟✨" },
    { id: 4, name: "Chicken-65", price: 2600, image: "https://1.bp.blogspot.com/-sI5g8lc2GBI/U-oGYz27tzI/AAAAAAAACiU/WK3gyrMI660/s1600/chicken%2B65%2Bnew.jpg ", description: "Spicy, deep-fried chicken bites packed with bold flavors. 🌶️🍗" },
    { id: 5, name: "Loose Prawns", price: 300, image: "https://i.ytimg.com/vi/RHe-OVxmU7I/maxresdefault.jpg", description: "Succulent prawns fried and tossed in flavorful spices. 🍤🧂" },
    { id: 6, name: "Tandoori kebab's", price: 350, image:"https://spicecravings.com/wp-content/uploads/2020/08/Chicken-Tikka-Square.jpg" , description: "Tender, smoky kebabs grilled with aromatic spices. 🥙🔥" },
    { id: 7, name: "Chicken Drumsticks", price: 300, image: "https://tse1.mm.bing.net/th/id/OIP.AEw2zeiOAMSqY85Ul4NqqAAAAA?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Perfectly roasted drumsticks with a crispy exterior. 🍗👌" },
    { id: 8, name:"Ginger Chicken", price: 260, image: "https://2.bp.blogspot.com/-1ejNcu__1S0/WP3-Iw_1mvI/AAAAAAAAHpM/_6m2PPY0wZ8bu_f5klcLh1TKyDlmocv7gCLcB/s1600/00000000000000000000000000000000000%25281%2529.jpg", description: "Chicken cooked with fresh ginger and aromatic spices. 🍗🌿" },
    { id: 9, name: "Pepper Chicken", price: 270, image: "https://tse4.mm.bing.net/th/id/OIP.JGcyg_yeuDRSgTpjiVa5YQHaE8?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Spicy pepper-coated chicken with a bold kick. 🌶️🍗" },
    { id: 10, name: "Chicken Mnachurian", price: 260, image: "https://www.licious.in/blog/wp-content/uploads/2022/06/shutterstock_685300129.jpg", description: "Indo-Chinese chicken balls in a tangy, savory sauce. 🍗🥢" },
  ], 
  desserts : [
    { id: 1, name: "Apricot Delight", price: 200, image: "https://img.freepik.com/premium-photo/apricot-delight-sweet-summer-treat-4k-apricot-image-photography_1020697-66926.jpg", description:"Soft, sweet apricot treat bursting with fruity flavor. 🍑✨" },
    { id: 2, name: "Qubani Ka Meetha", price: 80, image: "https://tse4.mm.bing.net/th/id/OIP.8yaOXMzsqIobDUhdEs0NBAHaEK?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Traditional Indian sweet made from cooked apricots. 🍯🌸" },
    { id: 3, name: "Double Ka Meetha", price: 80, image:"https://1.bp.blogspot.com/-Fx85EULgUqM/Wk8mC1yafzI/AAAAAAAAEaQ/03CcvwpAavA5iDNhJ4wObHqQoIhK8TtMQCLcBGAs/s1600/Double%2Bka%2BMeeta.JPG", description: "Rich bread pudding soaked in saffron and milk syrup. 🍞🥛" },
    { id: 4, name: "Gulab Jamun", price: 80, image: "https://img.freepik.com/premium-photo/indian-gulab-jamun_1085248-1214.jpg", description: "Soft, syrupy milk dumplings dripping with sweetness. 🌹🍬" },
    { id: 5, name: "Arabian Kunafa", price: 350, image: "https://static.republika.co.id/uploads/images/inpicture_slide/kunafa-kua-khas-dari-palestina-_180519183501-513.jpg", description: "Crispy pastry layered with sweet cheese or cream. 🧀🥮" },
    { id: 6, name: "Fruit Salad", price: 150, image:"https://tse3.mm.bing.net/th/id/OIP.sJpAHz5A_NYIfxsX6mBiHQHaEu?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" , description: "Fresh mix of juicy fruits for a refreshing taste. 🍓🍍" },
    { id: 7, name: "cashew Kunafa", price: 280, image: "https://th.bing.com/th/id/R.b1c885c8c20f9ce392f1c45373a2d289?rik=1ZqQ2V%2fH5oj3cQ&riu=http%3a%2f%2fthebaklavabox.com%2fcdn%2fshop%2ffiles%2fcashew-kunafa-670747.jpg%3fv%3d1745425451%26width%3d1024&ehk=SeIb8YLIsB99qzqeIT4sbCxOhZ9czGLk83A9bJ1LVtM%3d&risl=&pid=ImgRaw&r=0", description: "Nutty, cheesy dessert with golden crispy layers. 🌰🧁" },
    { id: 8, name:"Blue Lagon", price: 79, image: "https://tse2.mm.bing.net/th/id/OIP.vFsQVnVnlZY1NkBAwmxbdgHaHa?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", description: "Cool, refreshing blue-colored dessert drink. 🫐💙" },
    { id: 9, name: "Nutella Kunafa", price: 440, image: "https://th.bing.com/th/id/R.cdd9f67977217c7d52a162efad6a997d?rik=oe8TmRrqpJwIWg&riu=http%3a%2f%2fblogbaladi.com%2fimages%2f1016916_10151539167676704_476043875_n-425x318.jpg&ehk=KATh6BHR4enYzBujr%2fhZepIEVDLbdwF6K7Xxw6jXJVQ%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1", description: "Sweet, chocolaty nut-filled crispy pastry delight. 🍫✨" },
    { id: 10, name: "Classic cream kunafa", price: 390, image: "https://img.freepik.com/premium-photo/turkish-dessert-kunefe-kunafa-kadayif-with-pistachio-powder-cheese-hot-eaten-sweet_550617-70881.jpg?w=2000", description: "Creamy, soft kunafa with a golden crust. 🥮🌟" },
  ], 
    
    },
    reducers : { }
});
let cartSlice = createSlice({
  name : "cart",
  initialState : savedCart,
    reducers : {
      addToCart : (state,action) => {
        let item = state.find ((item) => item.name === action.payload.name);
        if (item){
          item.quantity +=1;
        }
        else {
          state.push({...action.payload, quantity:1});
        }
        localStorage.setItem("cart", JSON.stringify(state)); // ✅ save to localStorage
    
      },
      
increaseQty: (state, action) => {
      let item = state.find((item) => item.name === action.payload.name);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaseQty: (state, action) => {
      let item = state.find((item) => item.name === action.payload.name);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state = state.filter((i) => i.name !== action.payload.name); // remove if 0
      }
      localStorage.setItem("cart", JSON.stringify(state));
      return state;

    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.name !== action.payload.name);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    },
    clearCart: () => {
      localStorage.removeItem("cart");
      return []; // clears all items after order placed
    }
  }
});

export const {addToCart,increaseQty,decreaseQty,removeFromCart,clearCart} = cartSlice.actions;


const ordersSlice = createSlice ({
  name : "orders",
  initialState : [],  
  reducers : {
    addOrder : (state,action) => {
      state.push(action.payload);
    }
  }
});

export const { addOrder } = ordersSlice.actions;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // username save avuthundi
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { login, logout } = authSlice.actions;

const store = configureStore ({
    
        reducer : {
            Products : productsSlice.reducer
            , cart : cartSlice.reducer,
            orders : ordersSlice.reducer,
            auth: authSlice.reducer,

        }
        
        });
  
export default store;