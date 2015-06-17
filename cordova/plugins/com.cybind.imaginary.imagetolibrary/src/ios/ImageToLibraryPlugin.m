//
//  ImageToLibraryPlugin.m
//  ImgLibrarySave
//
//  Created by Andrew Kovalenko on 06/17/15.
//  Copyright (c) 2015 Cybind. All rights reserved.
//

#import "ImageToLibraryPlugin.h"
#import <Cordova/CDV.h>

@implementation ImageToLibraryPlugin

@synthesize callbackID;
@synthesize library;

-(void)saveImage:(CDVInvokedUrlCommand*)command 
{
    // The first argument in the arguments parameter is the callbackID.
    // We use this to send data back to the successCallback or failureCallback
    // through PluginResult
    
    self.callbackID = command.callbackId;

    // Get the string that javascript sent us
    NSString *stringObtainedFromJavascript = [command.arguments objectAtIndex:0];

    //Saving image to divice library
    NSURL *url = [NSURL URLWithString:stringObtainedFromJavascript];    
    NSData *imageData = [NSData dataWithContentsOfURL:url];
    UIImage *image = [UIImage imageWithData:imageData];
    [self saveImageToLibrary:image];
    
}


- (void) saveImageToLibrary: (UIImage *)image
{

    self.library = [[ALAssetsLibrary alloc] init];

    [self saveImage:image toAlbum:@"Imaginary" withCompletionBlock:^(NSError *error, NSString* url) {

        [self saveImageCallback:error url:url];
    
    }];
}

-(void)saveImageCallback:(NSError*)error url:(NSString*)imageUrl
{
    BOOL isError = NO;
    NSString *stringToReturn = @"";
        
    if (error!=nil) {
        isError = YES;
        stringToReturn  = [stringToReturn stringByAppendingString:[error description]];
    }
    else
    {
        stringToReturn  = imageUrl;
        NSLog(@"File URL: %@", stringToReturn);
    }
        
    CDVPluginResult* pluginResult = nil;
       
    if(!isError)
    {
        // Call the javascript success function
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: stringToReturn];
    }
    else
    {
        // Call the javascript error function
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    
}

-(void)saveImage:(UIImage*)image toAlbum:(NSString*)albumName withCompletionBlock:(SaveImageCompletion)completionBlock
{
    //write the image data to the assets library (camera roll)
    [self.library writeImageToSavedPhotosAlbum:image.CGImage orientation:(ALAssetOrientation)image.imageOrientation
                       completionBlock:^(NSURL* assetURL, NSError* error) {
                           
                           //error handling
                           if (error!=nil) {
                               
                               dispatch_async( dispatch_get_main_queue(), ^{
                                   
                                   completionBlock(error, nil);
                               });
                               
                               
                               return;
                           }
                           
                            NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
                            NSString *docs = [paths objectAtIndex:0];
                            NSString* path = [docs stringByAppendingFormat:@"/temp_image.jpg"];

                            NSData *imageData = [NSData dataWithData:UIImageJPEGRepresentation(image, 0.5)];
                            
                            NSError *writeError = nil;
                            [imageData writeToFile:path options:NSDataWritingAtomic error:&writeError];

                            if(writeError!=nil) {
                                NSLog(@"%@: Error saving image: %@", [self class], [writeError localizedDescription]);
                            }

                            //run the completion block
                            dispatch_async( dispatch_get_main_queue(), ^{
                               
                               completionBlock(nil, path);
                            });
                           
                       }];
}

@end