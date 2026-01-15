-- AlterTable
ALTER TABLE "shipments" ADD COLUMN     "currentLatitude" DOUBLE PRECISION,
ADD COLUMN     "currentLocation" TEXT,
ADD COLUMN     "currentLongitude" DOUBLE PRECISION,
ADD COLUMN     "lastLocationUpdate" TIMESTAMP(3);
