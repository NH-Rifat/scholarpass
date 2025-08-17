import { StyleSheet } from "react-native";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  welcomeSection: {
    marginBottom: spacing.xl,
  },
  welcomeTitle: {
    ...typography.h3,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    ...typography.body1,
    color: colors.gray600,
  },
  membershipCard: {
    backgroundColor: "#8B5CF6",
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: "column",
    gap: spacing.md,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  membershipContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 20,
    color: colors.white,
  },
  membershipText: {
    flex: 1,
  },
  membershipTitle: {
    ...typography.h4,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  membershipSubtitle: {
    ...typography.body2,
    color: "rgba(255, 255, 255, 0.8)",
  },
  joinButton: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xs,
  },
  joinButtonText: {
    ...typography.button,
    color: "#8B5CF6",
  },
  statsGrid: {
    gap: spacing.md,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: "center",
    minHeight: 120,
    justifyContent: "center",
  },
  blueCard: {
    backgroundColor: "#EFF6FF",
  },
  purpleCard: {
    backgroundColor: "#F3E8FF",
  },
  pinkCard: {
    backgroundColor: "#FDF2F8",
  },
  orangeCard: {
    backgroundColor: "#FFF7ED",
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  statNumber: {
    ...typography.h2,
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.body2,
    color: colors.gray600,
    textAlign: "center",
    lineHeight: 18,
  },
  // Featured Package Card Styles
  packageCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.xl,
    ...shadows.lg,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  featuredBadge: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    alignSelf: "flex-start",
    marginBottom: spacing.md,
  },
  featuredText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: "600",
  },
  packageContent: {
    flexDirection: "column",
  },
  packageLeft: {
    flex: 1,
  },
  packageTitle: {
    ...typography.h2,
    color: "#8B5CF6",
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },
  packageDescription: {
    ...typography.body1,
    color: colors.gray500,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  featuresList: {
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  featureIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    width: 20,
    color: "#8B5CF6", // Purple color to match the screenshot
    fontWeight: "bold",
  },
  featureText: {
    ...typography.body2,
    color: colors.gray500,
    flex: 1,
  },
  pricingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray200,
  },
  priceItem: {
    alignItems: "center",
    flex: 1,
  },
  priceLabel: {
    ...typography.body2,
    color: colors.gray500,
    fontSize: 10,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  regularPrice: {
    ...typography.h4,
    color: colors.gray600,
    textDecorationLine: "line-through",
  },
  scholarPrice: {
    ...typography.h4,
    color: "#8B5CF6",
    fontWeight: "bold",
  },
  studentPrice: {
    ...typography.h4,
    color: "#10B981",
    fontWeight: "bold",
  },
  enrollButton: {
    backgroundColor: "#8B5CF6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  enrollButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: "600",
    marginRight: spacing.xs,
  },
  enrollArrow: {
    ...typography.button,
    color: colors.white,
    fontSize: 16,
  },
  packageRight: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
  courseImageContainer: {
    position: "relative",
    alignItems: "center",
  },
  courseImagePlaceholder: {
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    width: "100%",
    borderWidth: 2,
    borderColor: "#8B5CF6",
    borderStyle: "dashed",
  },
  courseImageIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  courseImageText: {
    ...typography.body1,
    color: colors.gray900,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  courseImageSubText: {
    ...typography.body2,
    color: colors.gray600,
  },
  popularBadge: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginTop: spacing.sm,
    ...shadows.sm,
  },
  popularText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: "600",
    fontSize: 12,
  },
});
