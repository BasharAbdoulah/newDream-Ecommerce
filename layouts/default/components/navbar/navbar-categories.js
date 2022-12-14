import styled from "styled-components";
// components
import { DownOutlined } from "@ant-design/icons/lib/icons";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";
import IconTitleItem from "components/utils/icon-title-item.js";
// import Swiper, { SwiperChild } from "components/utils/swiper";

// css
import { COLORS, PADDINGS, STANDARD_SCREENS } from "styles/variables";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { searchAction } from "redux/modal/action";
import { memo } from "react";

const categories = [
    {
        catNameAR: "موضة نسائية",
        catName: "Women's Fashion",
        imagePath: "assets/images/pexels-lan-anh-ho…ng-10353828.jpg",
        id: "31afd7d2-5f4d-406d-ae5d-b46e5055b80c",
        hasChildren: true,
    },
    {
        catNameAR: "موضة رجالية",
        catName: "Men's Fashion",
        imagePath: "assets/images/austin-wade-d2s8NQ6WD24-unsplash.jpg",
        id: "f6222596-f422-4891-9a55-664e5e3017aa",
        hasChildren: true,
    },
    {
        catNameAR: "اولاد، اطفال والعاب",
        catName: "Kids, Baby & Toys",
        imagePath: "assets/images/robo-wunderkind-3EuPcI31MQU-unsplash.jpg",
        id: "818ce955-2ce3-4486-ba6e-45784c5cce99",
        hasChildren: true,
    },
    {
        catNameAR: "إكسسوارات وهدايا",
        catName: "Accessories and gifts",
        imagePath: "assets/images/freestocks-PxM8aeJbzvk-unsplash.jpg",
        id: "d115a1f7-2407-4446-9caa-dc9744e5bfa8",
        hasChildren: true,
    },
    {
        catNameAR: "الجمال",
        catName: "beauty supplies",
        imagePath: "assets/images/laura-chouette-RkINI2JZwss-unsplash.jpg",
        id: "7309f628-b98b-49cf-a67f-f01403baa31a",
        hasChildren: true,
    },
    {
        catNameAR: "ملتزمات رجالية",
        catName: "Men's stuff",
        imagePath: "assets/images/aniket-narula-XjNI-C5G6mI-unsplash.jpg",
        id: "bdd1e12a-ffa7-4b9c-93a5-b4180fb33675",
        hasChildren: true,
    },
    {
        catNameAR: "الموبايل وإكسسواراته",
        catName: "Mobiles & Accessories",
        imagePath: "assets/images/mehrshad-rajabi-cLrcbfSwBxU-unsplash.jpg",
        id: "e38f580e-b705-4055-ba59-6bc5714d7616",
        hasChildren: true,
    },
    {
        catNameAR: "المنزل والمطبخ",
        catName: "Home & Kitchen",
        imagePath: "assets/images/ryan-christodoulou-68CDDj03rks-unsplash.jpg",
        id: "d2a67fba-9070-4687-ae75-fb74f25e7924",
        hasChildren: true,
    },
    {
        catNameAR: "ماركات",
        catName: "Brands",
        imagePath: "assets/images/zara-outlet.jpg",
        id: "4774bfdb-5dca-47e7-a43b-0a8acb659305",
        hasChildren: true,
    },

    {
        catNameAR: "احذية رجالية",
        catName: "Men's shoes",
        imagePath: "assets/images/iman-ameli-XNWBOKpYgYE-unsplash.jpg",
        id: "7ff2c840-1f34-4f76-9fe9-07c123265c1e",
        hasChildren: true,
    },
    {
        catNameAR: "احذية نسائية",
        catName: "Women's shoes",
        imagePath: "assets/images/mohammad-metri-E-0ON3VGrBc-unsplash.jpg",
        id: "3ca11af3-e200-4898-8eb9-30f1bf3b8347",
        hasChildren: true,
    },
    {
        catNameAR: "احذية أطفال",
        catName: "Kids shoes",
        imagePath: "assets/images/lefteris-kallergis-j1GiPlvSGWI-unsplash.jpg",
        id: "33739903-d8c5-4604-9f27-4e52273110e8",
        hasChildren: true,
    },
    {
        catNameAR: "ألبسة الأطفال",
        catName: "Children's Clothing",
        imagePath: "assets/images/lefteris-kallergis-j1GiPlvSGWI-unsplash.jpg",
        id: "6956bc2b-b8f6-48be-8be6-6c56983c79d5",
        hasChildren: true,
    },
];

// styled components
const NavCategories = styled.div`
    background-color: ${COLORS.BG_COLOR_GRAY};
    padding: 0 40px;
`;

const CategoriesContainer = styled.div`
    flex: 1;
    overflow: hidden;
`;

const AllCategories = styled.div`
    width: 170px;
    font-size: 17px;
`;

const CategoriesContainerInner = styled.div`
    display: flex;
    overflow: auto;
    font-size: 17px;
    scroll-snap-type: x mandatory;
    &::-webkit-scrollbar {
        display: none;
    }
    > div {
        scroll-snap-align: start;
    }
`;

// &::-webkit-scrollbar {
//   display: none;
// }
function NavbarCategories({ t }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const clearInputValue = () => {
        const categoryItems = document.querySelectorAll(".sidebar-item");
        if (categoryItems.length > 0) {
            categoryItems.forEach((item) => {
                // item.classList.remove("active");
            });
        }
        dispatch(searchAction(""));
    };

    return (
        <NavCategories>
            <FlexDiv gap={10}>
                <AllCategories>
                    <IconTitleItem
                        title={t("navbar.allCategories")}
                        icon={<DownOutlined />}
                        block
                        color={
                            router.pathname.includes("/categories")
                                ? COLORS.PRIMARY
                                : ""
                        }
                        href="/categories"
                        justify={"space-evenly"}
                        rowReverse={true}
                        padding={8}
                    />
                </AllCategories>
                <CategoriesContainer>
                    <CategoriesContainerInner>
                        {categories?.map((item) => (
                            <IconTitleItem
                                title={
                                    router.locale === "ar"
                                        ? item.catNameAR
                                        : item.catName
                                }
                                padding={PADDINGS.categories_item_x_y}
                                hoverColor={COLORS.PRIMARY}
                                onClick={clearInputValue}
                                hoverEffect="under-line"
                                key={item.id}
                                href={`/categories/${item.id}`}
                                color={
                                    router.asPath.includes(
                                        `/categories/${item.id}`
                                    )
                                        ? COLORS.PRIMARY
                                        : ""
                                }
                            />
                        ))}
                    </CategoriesContainerInner>
                </CategoriesContainer>
            </FlexDiv>
        </NavCategories>
    );
}

export default NavbarCategories;
