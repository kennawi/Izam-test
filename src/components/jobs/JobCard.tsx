"use client";

import { LocationOn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  //   IconButton,
  Typography,
} from "@mui/material";
import React from "react";

interface StyledCardProps {
  data: {
    logo: string;
    title: string;
    company: string;
    location: string;
    timeAgo: string;
    experience: string;
    type: string;
    workType: string;
    categories: string[];
  };
  index: number;
  selectedCard: number | null;
  setSelectedCard: (index: number) => void;
}

export default function JobCard({
  data,
  index,
  selectedCard,
  setSelectedCard,
}: StyledCardProps) {
  return (
    <Card variant="outlined" sx={{ "& :hover": { bgcolor: "#F3FDF3" } }}>
      <CardActionArea
        onClick={() => setSelectedCard(index)}
        data-active={selectedCard === index ? "" : undefined}
        sx={{
          height: "100%",

          "&[data-active]": {
            backgroundColor: "#F3FDF3",

            border: "solid 1px #48A74C",
          },
        }}
      >
        <CardHeader
          avatar={<Avatar src={data.logo} />}
          title={
            <Typography
              variant="h3"
              sx={{
                fontSize: { md: "25px", xs: "14px" },
                fontWeight: { md: 400, xs: 500 },
              }}
              component="div"
            >
              {data.title}
            </Typography>
          }
          subheader={
            <Typography
              sx={{
                fontWeight: 700,
                color: "#14A077",
                fontSize: { md: "17px", xs: "11px" },
              }}
              component="div"
            >
              {data.company}
            </Typography>
          }
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mb: 1,
              color: "text.secondary",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <LocationOn fontSize="small" />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: "#707070",
                  fontSize: { md: "17px", xs: "11px" },
                }}
              >
                {data.location}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: 400,
                color: "#707070",
                fontSize: { md: "17px", xs: "11px" },
              }}
              variant="body2"
            >
              •
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                color: "#707070",
                fontSize: { md: "17px", xs: "11px" },
              }}
              variant="body2"
            >
              {data.timeAgo}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              mb: 2,
            }}
          >
            <Chip
              sx={{
                fontWeight: 500,
                bgcolor: "#F7F7F7",
                borderRadius: "2px",
                color: "#707070",
                fontSize: { md: "16px", xs: "9px" },
              }}
              label={data.experience}
              size="small"
            />
            <Chip
              sx={{
                fontWeight: 500,
                bgcolor: "#F7F7F7",
                borderRadius: "2px",
                color: "#707070",
                fontSize: { md: "16px", xs: "9px" },
              }}
              label={data.type}
              size="small"
            />
            <Chip
              sx={{
                fontWeight: 500,
                bgcolor: "#F7F7F7",
                borderRadius: "2px",
                color: "#707070",
                fontSize: { md: "16px", xs: "9px" },
              }}
              label={data.workType}
              size="small"
            />
          </Box>
        </CardContent>
        <Divider />
        <Box sx={{ p: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {data.categories.map((category, idx) => (
            <Typography
              key={idx}
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 400,
                borderRadius: "2px",
                color: "#707070",
                fontSize: { md: "17px", xs: "10px" },
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {idx > 0 && "•"} {category}
            </Typography>
          ))}
        </Box>
      </CardActionArea>
    </Card>
  );
}
