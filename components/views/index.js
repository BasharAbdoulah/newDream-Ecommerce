import BannerSlide from "components/sliders/banner-slide";
import CategorySlide from "components/sliders/category-slides";
import ProductSectionPart from "components/products/product-section";
import Container from "components/utils/container";
import LastAdsSlide from "../sliders/last-ads-slide";
// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import AdsArea from "components/ads-area";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";

const data = [
    {
        id: "1",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT95PfXIrsxF-0hNyGd_0jSK0qHyuyh-C4PiA&usqp=CAU",
    },
    {
        id: "2",
        src: "data:image/jpeg;base64,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",
    },
    {
        id: "3",
        src: "data:image/jpeg;base64,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",
    },
    {
        id: "4",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUeF2nebNn_02kNXeEsXTPXh81NGEvvY_3SQ&usqp=CAU",
    },
    {
        id: "5",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUeF2nebNn_02kNXeEsXTPXh81NGEvvY_3SQ&usqp=CAU",
    },
    {
        id: "6",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUeF2nebNn_02kNXeEsXTPXh81NGEvvY_3SQ&usqp=CAU",
    },
    {
        id: "7",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUeF2nebNn_02kNXeEsXTPXh81NGEvvY_3SQ&usqp=CAU",
    },
];

function HomePage({ list }) {
    const { t } = useTranslation("common");
    const router = useRouter();
    const { data: uData } = useSession();
    const [offersProducts, setOffersProducts] = useState();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [LastOrderProducts, setLastOrderProducts] = useState([]);

    useEffect(async () => {
        // Fetch Offers products
        try {
            await axios
                .post(
                    `${process.env.NEXT_PUBLIC_HOST_API}api/ListProductOffer`,
                    {
                        PageSize: 20,
                        PageNumber: 1,
                    },
                    {
                        headers: {
                            lang: router.locale,
                        },
                    }
                )
                .then((result) => {
                    setOffersProducts(result.data.description);
                });
        } catch (error) {
            console.error("OfferProductsErr:", error);
        }

        // Fetch ProductByFavorite and ProductOffer in array

        try {
            await axios
                .post(
                    `${process.env.NEXT_PUBLIC_HOST_API}api/ListProductByLastOrder`,
                    {
                        PageNumber: "1",
                        SizeNumber: "1",
                    },
                    {
                        headers: {
                            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoia2hhbGVkIiwiUm9sZSI6IlVzZXIiLCJleHAiOjE2NjU1MDUyNzcsImlzcyI6IkludmVudG9yeUF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiSW52ZW50b3J5U2VydmljZVBvdG1hbkNsaWVudCJ9.9bMcWssCKH-CwjbmzgOdmIWgWa1X9VtQ15iI69RjtWE`,
                        },
                    }
                )
                .then((result) => {
                    setLastOrderProducts(result.data.description);
                });
        } catch (error) {
            console.error("ListProductByLastOrder:", error);
        }

        await axios
            .post(
                `${process.env.NEXT_PUBLIC_HOST_API}api/ListProductByFavorite`,
                {
                    PageNumber: "1",
                    SizeNumber: "1",
                },
                {
                    headers: {
                        Authorization: `bearer ${uData?.user.token}`,
                    },
                }
            )
            .then((result) => {
                setFavoriteProducts(result.data.description);
            })
            .catch((error) => console.error("ListProductByFavorite:", error));
    }, []);

    return (
        <>
            <Container>
                <BannerSlide />
                <CategorySlide router={router} />
                <ProductSectionPart
                    list={list}
                    title={t("latestTxt", {
                        name: t("commonWords.products"),
                    })}
                />

                <ProductSectionPart
                    list={[...LastOrderProducts, ...favoriteProducts]}
                    title={t("suggestedTxt", {
                        name: t("commonWords.products"),
                    })}
                />
            </Container>
            <Container>
                <AdsArea />
            </Container>

            {/* <Temporary /> */}
            <Container>
                <ProductSectionPart
                    list={offersProducts}
                    title={t("offersTxt")}
                />
            </Container>

            {/* Adds Slider */}
            <Container>
                <LastAdsSlide />
            </Container>
        </>
    );
}

export default HomePage;
