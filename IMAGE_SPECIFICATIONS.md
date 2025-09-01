# 🖼️ Stitched 2.5K QHD Image Specifications

## Your Setup: **12,800 × 1,440 pixels**

### Your Image Configuration:

1. **Per Section Image:**
   - Width: 2,560 pixels (2.5K QHD width)
   - Height: 1,440 pixels (2.5K QHD height)
   - Aspect Ratio: 16:9 (2560 ÷ 1440 = 1.78)
   - Quality: 2.5K QHD resolution

2. **Stitched Total Image:**
   - Total Width: 12,800 pixels (5 × 2,560px)
   - Total Height: 1,440 pixels
   - Format: 5 sections stitched horizontally
   - Movement: 1:1 (background moves exactly with sections)

3. **Perfect Alignment:**
   - Each scroll = one section = one background image
   - No parallax offset - direct mapping
   - Section 1 shows background area 0-2,560px
   - Section 2 shows background area 2,560-5,120px
   - And so on...

## Alternative 2K & Higher Resolutions

### **Ultra-High 4K Per Section:**
```
Resolution: 20,480 × 2,304 pixels
Section Size: 4,096 × 2,304 pixels (4K 16:9)
Aspect Ratio: 16:9
Use Case: Maximum quality, 4K displays
File Size: ~25-35MB
```

### **High-Quality 2.5K:**
```
Resolution: 12,800 × 1,440 pixels  
Section Size: 2,560 × 1,440 pixels (2.5K 16:9)
Aspect Ratio: 16:9
Use Case: High-res displays, excellent quality
File Size: ~10-18MB
```

### **Standard Full HD:**
```
Resolution: 9,600 × 1,080 pixels
Section Size: 1,920 × 1,080 pixels (Full HD 16:9)
Aspect Ratio: 16:9
Use Case: Fast loading, good quality
File Size: ~5-10MB
```

## Image Creation Guidelines

### **Design Considerations:**
- **Horizontal Layout:** Design flows left to right across 5 sections
- **Section Boundaries:** Plan content transitions at 3,000px intervals
- **Parallax Effect:** Background moves at 20% speed (slower than content for depth)
- **Full Coverage:** Image must span the complete 15,000px width to avoid gaps
- **Responsive Design:** Ensure important elements aren't too close to edges

### **Technical Requirements:**
- **Format:** PNG (lossless) or high-quality WebP
- **Color Space:** sRGB for web compatibility
- **DPI:** 72-96 DPI (web standard)
- **Compression:** Optimize for web while maintaining quality
- **Exact Dimensions:** Must be exactly 15,000×3,240px for perfect alignment

### **Content Distribution (Your Stitched Layout):**
```
Section 1 (Me):        0px - 2,560px      (1st background image)
Section 2 (Projects):  2,560px - 5,120px  (2nd background image)
Section 3 (Skills):    5,120px - 7,680px  (3rd background image)
Section 4 (Resume):    7,680px - 10,240px (4th background image)
Section 5 (Contact):   10,240px - 12,800px (5th background image)
```

Total Stitched Image: 12,800 × 1,440 pixels (2.5K QHD per section)

## File Naming Convention

Place your image in the `public/` folder with the name:
```
upscale_design.png
```

## Performance Optimization Tips

1. **WebP Format:** Consider creating a WebP version for better compression
2. **Progressive Loading:** Use progressive JPEG/PNG for faster initial display
3. **CDN Delivery:** Host large images on a CDN for global performance
4. **Lazy Loading:** Image loads during the initial loading screen

## Implementation Details

### **How It Works:**
1. **1:1 Movement:** Background moves exactly the same distance as sections
2. **Perfect Mapping:** Each section reveals exactly one of your 2560×1440 images
3. **No Parallax:** Background and content move together (no depth offset)
4. **Seamless Stitching:** Your 5 images appear as one continuous background

### **Your Image Checklist:**
- ✅ Total Resolution: 12,800 × 1,440 pixels
- ✅ Per Section: 2,560 × 1,440 pixels (2.5K QHD 16:9)
- ✅ 5 individual images stitched horizontally
- ✅ Each image designed for its specific section content
- ✅ Smooth transitions at 2,560px boundaries
- ✅ Format: PNG or high-quality WebP
- ✅ File size: 10-20MB (depending on compression)

## Current Implementation

Your portfolio is now configured for:
- ✅ 1:1 background movement (no parallax offset)
- ✅ Perfect 2.5K QHD quality per section
- ✅ Hardware-accelerated rendering
- ✅ Exact mapping: each scroll reveals one background image
- ✅ Optimized for your 12,800×1,440 stitched image

Each section scroll will now reveal exactly one of your 2560×1440 background images!
